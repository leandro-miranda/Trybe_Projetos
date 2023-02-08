const sinon = require('sinon');
const chai = require('chai');
const { Sale, SaleProduct } = require('../../database/models')
const app = require('../../api/app')
const chaiHttp = require('chai-http');
const { sales } = require('./mocks/sales');
const { purchaseProducts } = require('./mocks/products');

chai.use(chaiHttp);

const { expect } = chai

describe('integration test sale', () => {
  afterEach(sinon.restore)

  let chaiHttpResponse;

  it('should be get all sales', async () => {
    sinon.stub(Sale, 'findAll').resolves(sales)

    chaiHttpResponse = await chai
      .request(app)
      .get('/sales');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(sales);
  })

  it('should be get sale by id', async () => {
    sinon.stub(Sale, 'findOne').resolves(sales[0])

    chaiHttpResponse = await chai
      .request(app)
      .get('/sales/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(sales[0]);
  })

  it('should be not get sale by invalid id', async () => {
    sinon.stub(Sale, 'findOne').resolves(undefined)

    chaiHttpResponse = await chai
      .request(app)
      .get('/sales/11111');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Sale not found" });
  })

  it('should be update sale', async () => {
    sinon.stub(Sale, 'update').resolves(undefined)

    chaiHttpResponse = await chai
      .request(app)
      .put('/sales/1')
      .send({ status: "preparando" });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Updated" });
  })

  it('should be create a sale', async () => {
    sinon.stub(Sale, 'create').resolves({ id: 1 })
    sinon.stub(SaleProduct, 'bulkCreate').resolves(undefined)

    chaiHttpResponse = await chai
      .request(app)
      .post('/sales')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NTI3NjIzOCwiZXhwIjoxNjc1NTM1NDM4fQ.7oib4U8QJSwo7-XsO8Ard2OARMEARSw0y66G5dUy3iQ',
      })
      .send({
        sale: {
          sellerId: 1,
          totalPrice: 22.00,
          deliveryAddress: 'Rua irineu de abreu',
          deliveryNumber: '132',
          saleDate: new Date(),
        },
        products: purchaseProducts
      })

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({ saleId: 1 });
  })

  it('should be not create a sale without token', async () => {
    sinon.stub(Sale, 'create').resolves({ saleId: 1 })
    sinon.stub(Sale, 'bulkCreate').resolves(undefined)

    chaiHttpResponse = await chai
      .request(app)
      .post('/sales')
      .send({
        sale: {
          sellerId: 1,
          totalPrice: 22,
          deliveryAddress: 'Rua irineu de abreu',
          deliveryNumber: 132,
          saleDate: new Date(),
        },
        products: purchaseProducts
      })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Token not found" });
  })

  it('should be not create a sale with invalid token', async () => {
    sinon.stub(Sale, 'create').resolves({ saleId: 1 })
    sinon.stub(Sale, 'bulkCreate').resolves(undefined)

    chaiHttpResponse = await chai
      .request(app)
      .post('/sales')
      .set({
        Authorization: 'xxxxxxxxYxxYxx',
      })
      .send({
        sale: {
          sellerId: 1,
          totalPrice: 22,
          deliveryAddress: 'Rua irineu de abreu',
          deliveryNumber: 132,
          saleDate: new Date(),
        },
        products: purchaseProducts
      })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Expired or invalid token" });
  })
});