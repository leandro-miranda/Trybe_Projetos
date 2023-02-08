const sinon = require('sinon');
const chai = require('chai');
const { User } = require('../../database/models')
const app = require('../../api/app')
const chaiHttp = require('chai-http');
const { sellers } = require('./mocks/user');

chai.use(chaiHttp);

const { expect } = chai

describe('integration test sellers', () => {
  afterEach(sinon.restore)

  let chaiHttpResponse;

  it('should be get all sellers', async () => {
    sinon.stub(User, 'findAll').resolves(sellers)

    chaiHttpResponse = await chai
      .request(app)
      .get('/sellers');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(sellers);
  })
});