const sinon = require('sinon');
const chai = require('chai');
const { Product } = require('../../database/models')
const app = require('../../api/app')
const chaiHttp = require('chai-http');
const { products } = require('./mocks/products');

chai.use(chaiHttp);

const { expect } = chai

describe('integration test product', () => {
  afterEach(sinon.restore)

  let chaiHttpResponse;

  it('should be get all products', async () => {
    sinon.stub(Product, 'findAll').resolves(products)

    chaiHttpResponse = await chai
      .request(app)
      .get('/customer/products');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(products);
  })
});