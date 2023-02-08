const sinon = require('sinon');
const chai = require('chai');
const { User } = require('../../database/models')
const app = require('../../api/app')
const chaiHttp = require('chai-http');
const { users, registerCreateOutput, registerInput } = require('./mocks/user');

chai.use(chaiHttp);

const { expect } = chai

describe('integration test admin', () => {
  afterEach(sinon.restore)

  let chaiHttpResponse;

  it('should be admin get all users', async () => {
    sinon.stub(User, 'findAll').resolves(users)

    chaiHttpResponse = await chai
      .request(app)
      .get('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(users);
  })

  it('should be not admin get all users without auth token', async () => {
    sinon.stub(User, 'findOne').resolves(users)

    chaiHttpResponse = await chai
      .request(app)
      .get('/admin');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  })

  it('should be admin post user', async () => {
    sinon.stub(User, 'findOne').resolves(undefined)
    sinon.stub(User, 'create').resolves(registerCreateOutput)

    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send(registerInput)

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal('New user added successfully');
  })

  it('should be not admin post existing user', async () => {
    sinon.stub(User, 'findOne').resolves({ id: 1 })

    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send(registerInput)

    expect(chaiHttpResponse.status).to.be.equal(409);
    expect(chaiHttpResponse.body).to.be.deep.equal('User already exists');
  })

  it('should be not admin post user without auth token', async () => {
    sinon.stub(User, 'findOne').resolves(undefined)
    sinon.stub(User, 'create').resolves(registerCreateOutput)

    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .send(registerInput)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  })

  it('should be not admin post user without name', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send({ email: 'teste@email.com', password: 'senha@secreta' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"name" is required' });
  })

  it('should be not admin post user with name less than 12 caracters long', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send({ name: 'icaro', email: 'teste@email.com', password: 'senha@secreta' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"name" length must be at least 12 characters long' });
  })

  it('should be not admin post user without email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send({ name: 'irineu de abreu', password: 'senha@secreta' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"email" is required' });
  })

  it('should be not admin post user with incorrect email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send({ name: 'irineu de abreu silva', email: 'teste.email.com', password: 'senha@secreta' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"email" must be a valid email' });
  })

  it('should be not admin post user without password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send({ name: 'irineu de abreu', email: 'teste@email.com' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"password" is required' });
  })

  it('should be not admin post user with password less than 6 caracters long', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send({ name: 'irineu de abreu silva', email: 'teste@email.com', password: 'senha' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"password" length must be at least 6 characters long' });
  })

  it('should be not admin post user without role', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/admin')
      .set({
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MzY1OTg0LCJleHAiOjE2NzU2MjUxODR9.yj-zYZblMFmrdmiPEJcEemIycDxdY7TVT_W-8XA-KaM',
      })
      .send({ name: 'irineu de abreu', email: 'teste@email.com', password: 'senha@secreta' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"role" is required' });
  })

  it('should be admin destroy existing user', async () => {
    sinon.stub(User, 'destroy').resolves(null)

    chaiHttpResponse = await chai
      .request(app)
      .delete('/admin/icaro@moura.com')

    expect(chaiHttpResponse.status).to.be.equal(204);
  })
});