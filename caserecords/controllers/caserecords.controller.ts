import express from 'express';

import caseRecordsService from '../services/caserecords.service';

class CaseRecordsController {
  async filterCaseRecords(req: express.Request, res: express.Response) {
    const { startDate, endDate, minCount, maxCount } = req.body;

    try {
      const caseRecords = await caseRecordsService.filter(new Date(startDate), new Date(endDate), minCount, maxCount);
      const response = { code: 0, msg: "Success", records: caseRecords };
      res.status(200).send(response);
    } catch (e) {
      const response = { code: -1, msg: `Exception occurred: ${e}` };
      res.status(500).send(response);
    }
  }
}

export default new CaseRecordsController();