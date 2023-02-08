const sinon = require('sinon');
const chai = require('chai');
const { User } = require('../../database/models')
const { buyerLogin, users } = require('./mocks/user');
const app = require('../../api/app')
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai

describe('integration test login', () => {
  afterEach(sinon.restore)

  let chaiHttpResponse;

  it('should be login with customer', async () => {
    sinon.stub(User, 'findOne').resolves(users[2])

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(buyerLogin);

    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  it('should be login with customer empty password', async () => {
    sinon.stub(User, 'findOne').resolves(users[2])

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: buyerLogin.email, password: '' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"password" is not allowed to be empty'});
  })

  it('should be login with customer password length must be at least 6 characters long', async () => {
    sinon.stub(User, 'findOne').resolves(users[2])

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: buyerLogin.email, password: '123' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"password" length must be at least 6 characters long'});
  })

  it('should be login with customer incorrect password', async () => {
    sinon.stub(User, 'findOne').resolves(users[2])

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: buyerLogin.email, password: '123456' });

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Uncorrect Password'});
  })

  it('should be login with customer invalid email', async () => {
    sinon.stub(User, 'findOne').resolves(undefined)

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'irineu', password: '123456' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"email" must be a valid email'});
  })

  it('should be login with customer incorrect email', async () => {
    sinon.stub(User, 'findOne').resolves(undefined)

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'irineu@email.com', password: '123456' });

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found'});
  })
});