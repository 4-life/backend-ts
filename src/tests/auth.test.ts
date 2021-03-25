process.env.NODE_ENV = 'test';
process.env.SECRET_KEY = 'secret';

import { use } from 'chai';
import { request } from 'chai';

//Require the dev-dependencies
const chaiHttp = require('chai-http');
import chai = require('chai');
const expect = chai.expect;

use(chaiHttp);
const server = require('../server');
const authenticatedUser = request.agent(server);
const db = require('../models/index');


describe('Auth', () => {
  // Initialize test db before tests
  before((done) => {
    db.initDB(done);
  });
  describe('Sign up', () => {
    it(`should return error missed user name`, (done) => {
      request(server)
        .post('/signup')
        .send({ email: 'user@email.com', password: '123' })
        .end((_, res) => {
          expect(res.body.success).is.false;
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(400);
          expect(res.body.message).is.equal('User data is not valid. Field "username" is missing');
          done();
        });
    });

    it(`should return error missed email`, (done) => {
      request(server)
        .post('/signup')
        .send({ username: 'user', password: '123' })
        .end((_, res) => {
          expect(res.body.success).is.false;
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(400);
          expect(res.body.message).is.equal('User data is not valid. Field "email" is missing');
          done();
        });
    });

    it(`should return error unknown field`, (done) => {
      request(server)
        .post('/signup')
        .send({ username: 'user', password: '123', email: 'user@email.com', qwe: '1234' })
        .end((_, res) => {
          expect(res.body.success).is.false;
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(400);
          expect(res.body.message).is.equal('Unknown field: "qwe"');
          done();
        });
    });

    it(`should create user`, (done) => {
      request(server)
        .post('/signup')
        .send({ username: 'user', email: 'user@email.com', password: '123' })
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(200);
          expect(res.body.success).is.true;
          expect(res.body.message).is.equal('User successfully created');
          expect(res.body.data.email).is.equal('user@email.com');
          expect(res.body.data.username).is.equal('user');
          expect(res.body.data.id).be.a('Number');
          done();
        });
    });

    it(`user already exists (email)`, (done) => {
      request(server)
        .post('/signup')
        .send({ username: 'username', email: 'user@email.com', password: '123' })
        .end((_, res) => {
          expect(res.status).is.equal(409);
          expect(res.body).be.a('Object');
          expect(res.body.message).is.equal('User already exists');
          done();
        });
    });

    it(`user already exists (username)`, (done) => {
      request(server)
        .post('/signup')
        .send({ username: 'user', email: 'another@email.com', password: '123' })
        .end((_, res) => {
          expect(res.status).is.equal(409);
          expect(res.body).be.a('Object');
          expect(res.body.message).is.equal('User already exists');
          done();
        });
    });
  });

  describe('Login', () => {
    it(`should return user data`, (done) => {
      request(server)
        .post('/login')
        .send({ username: 'user', password: '123' })
        .end((_, res) => {
          expect(res.body.message).is.equal('OK');
          expect(res.status).is.equal(200);
          expect(res.body).be.a('Object');
          expect(res.body.token).be.a('String');
          expect(res.body.data.email).is.equal('user@email.com');
          expect(res.body.data.username).is.equal('user');
          expect(res.body.data.password).is.undefined;
          done();
        });
    });
    it(`should return error`, (done) => {
      request(server)
        .post('/login')
        .send({ username: 'user', password: '1234' })
        .end((err, res) => {
          expect(res.status).is.equal(401);
          expect(res.body).be.a('Object');
          expect(res.body.message).is.equal('Wrong credentials!');
          done();
        });
    });
  });

  let token = '';
  describe('Only auth users have access', () => {
    before((done) => {
      authenticatedUser
        .post(`/login`)
        .send({ username: 'user', password: '123' })
        .end((_, res) => {
          token = res.body.token;
          expect(res.status).is.equal(200);
          expect(res.body.data.email).is.equal('user@email.com');
          expect(res.body.data.username).is.equal('user');
          expect(res.body.data.password).is.undefined;
          done();
        });
    });
    it(`should return 401`, (done) => {
      request(server)
        .get('/profile')
        .end((_, res) => {
          expect(res.status).is.equal(401);
          done();
        });
    });
    it(`should return 200`, (done) => {
      authenticatedUser
        .get('/profile')
        .set({ Authorization: token })
        .end((_, res) => {
          expect(res.status).is.equal(200);
          expect(res.body.data.email).is.equal('user@email.com');
          expect(res.body.data.username).is.equal('user');
          expect(res.body.data.password).is.undefined;
          done();
        });
    });
  });
});
