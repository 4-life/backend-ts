process.env.NODE_ENV = 'test';
process.env.SECRET_KEY = 'secret';

import { use } from 'chai';
import { request } from 'chai';

//Require the dev-dependencies
import chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models/index');

use(chaiHttp);

let token = '';

describe('CRUD', () => {
  // Initialize test db before tests
  before((done) => {
    db.initDB(done);
  });

  describe('Create Contact', () => {
    it(`It should create contact and return his name`, (done) => {
      request(server)
        .post('/contacts')
        .send({ identify: 'first-contact', name: 'John' })
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(200);
          expect(res.body.success).is.true;
          expect(res.body.message).is.equal('Contact successfully created');
          expect(res.body.data.identify).is.equal('first-contact');
          expect(res.body.data.name).is.equal('John');
          expect(res.body.data.id).be.a('Number');
          done();
        });
    });
    it(`It shouldn't create contact, with error`, (done) => {
      request(server)
        .post('/contacts')
        .send({ identify: 'first-contact', name: 'John' })
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(409);
          expect(res.body.success).is.false;
          expect(res.body.message).is.equal('Contact is already created');
          expect(res.body.data.identify).is.equal('first-contact');
          expect(res.body.data.name).is.equal('John');
          expect(res.body.data.id).be.a('Number');
          done();
        });
    });
  });

  describe('Update Contact', () => {
    it(`It should update contact`, (done) => {
      request(server)
        .put('/contacts/first-contact')
        .send({ name: 'Jack' })
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(200);
          expect(res.body.success).is.true;
          expect(res.body.message).is.equal('Contact successfully updated');
          expect(res.body.data.identify).is.equal('first-contact');
          expect(res.body.data.name).is.equal('Jack');
          done();
        });
    });
    it(`Contact not found`, (done) => {
      request(server)
        .put('/contacts/another-contact')
        .send({ name: 'Jack' })
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(404);
          expect(res.body.success).is.false;
          expect(res.body.message).is.equal('Contact not found!');
          done();
        });
    });
  });

  describe('Read Contact', () => {
    it(`Should return contact`, (done) => {
      request(server)
        .get('/contacts/first-contact')
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(200);
          expect(res.body.success).is.true;
          expect(res.body.message).is.equal('OK');
          expect(res.body.data.identify).is.equal('first-contact');
          expect(res.body.data.name).is.equal('Jack');
          done();
        });
    });
    it(`Should return 'Contact not found'`, (done) => {
      request(server)
        .get('/contacts/another-contact')
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(404);
          expect(res.body.success).is.false;
          expect(res.body.message).is.equal('Contact not found!');
          done();
        });
    });
  });

  describe('Delete Contact', () => {
    it(`Should delete user`, (done) => {
      request(server)
        .del('/contacts/first-contact')
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(200);
          expect(res.body.success).is.true;
          expect(res.body.message).is.equal('Contact removed successfully!');
          done();
        });
    });
    it(`Should return 'Contact not found' for removed contact`, (done) => {
      request(server)
        .get('/contacts/first-contact')
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(404);
          expect(res.body.success).is.false;
          expect(res.body.message).is.equal('Contact not found!');
          done();
        });
    });
    it(`Should return 'contact not found'`, (done) => {
      request(server)
        .get('/contacts/another-contact')
        .end((_, res) => {
          expect(res.body).be.a('Object');
          expect(res.status).is.equal(404);
          expect(res.body.success).is.false;
          expect(res.body.message).is.equal('Contact not found!');
          done();
        });
    });
  });

});
