import server from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

const caseRecordsFilterBody = {
  startDate: "2017-01-27",
  endDate: "2017-01-29",
  minCount: 100,
  maxCount: 150
};

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

  it('should allow a POST to /caserecords', async function () {
    const res = await request.post('/caserecords').send(caseRecordsFilterBody);

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.code).to.be.a('number');
    expect(res.body.msg).to.be.a('string');
    expect(res.body.records).to.be.a('array');
  });
});