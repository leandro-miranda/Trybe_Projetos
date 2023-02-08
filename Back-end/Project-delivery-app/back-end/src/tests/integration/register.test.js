const sinon = require('sinon');
const chai = require('chai');
const { User } = require('../../database/models');
const app = require('../../api/app');
const register = require('../../services/register.service')
const chaiHttp = require('chai-http');
const { sellers, registerOutput, registerInput, registerCreateOutput } = require('./mocks/user');

chai.use(chaiHttp);

const { expect } = chai

describe('integration test register', () => {
  afterEach(sinon.restore)

  let chaiHttpResponse;

  it('should be register a user', async () => {
    sinon.stub(User, 'findOne').resolves(undefined)
    sinon.stub(User, 'create').resolves(registerCreateOutput)

    chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send(registerInput)

    expect(chaiHttpResponse.status).to.be.equal(201);
  })

  it('should be register a user', async () => {
    sinon.stub(User, 'findOne').resolves({ id: 1 })

    chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send(registerInput)

    expect(chaiHttpResponse.status).to.be.equal(409);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'User already registered'});
  })
});