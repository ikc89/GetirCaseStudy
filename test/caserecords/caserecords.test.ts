import server from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('caserecords endpoint', function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(server);
  });
  after(function (done) {
    server.close(() => {
      mongoose.connection.close(done);
    });
  });

  it('should return error when body is empty', async function () {
    const res = await request.post('/caserecords').send({});

    expect(res.status).to.equal(400);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.be.eq('Missing required fields startDate and endDate and minCount and maxCount');
  });

  it('should return error when body includes only startDate', async function () {
    const res = await request.post('/caserecords').send({
      startDate: "2017-01-27"
    });

    expect(res.status).to.equal(400);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.be.eq('Missing required fields startDate and endDate and minCount and maxCount');
  });

  it('should return error when body includes only startDate and endDate', async function () {
    const res = await request.post('/caserecords').send({
      startDate: "2017-01-27",
      endDate: "2017-01-29"
    });

    expect(res.status).to.equal(400);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.be.eq('Missing required fields startDate and endDate and minCount and maxCount');
  });

  it('should return error when body includes only startDate and endDate and minCount', async function () {
    const res = await request.post('/caserecords').send({
      startDate: "2017-01-27",
      endDate: "2017-01-29",
      minCount: 100
    });

    expect(res.status).to.equal(400);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.be.eq('Missing required fields startDate and endDate and minCount and maxCount');
  });

  it('should get some records', async function () {
    const res = await request.post('/caserecords').send({
      startDate: "2017-01-27",
      endDate: "2017-01-29",
      minCount: 100,
      maxCount: 150
    });

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.code).to.be.a('number');
    expect(res.body.msg).to.be.a('string');
    expect(res.body.records).to.be.a('array');
    expect(res.body.records.length).to.greaterThan(0);
  });

  it('should get empty records', async function () {
    const res = await request.post('/caserecords').send({
      startDate: "2021-08-14",
      endDate: "2021-08-15",
      minCount: 100,
      maxCount: 150
    });

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.code).to.be.a('number');
    expect(res.body.msg).to.be.a('string');
    expect(res.body.records).to.be.a('array');
    expect(res.body.records.length).to.be.eq(0);
  });
});