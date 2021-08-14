import express from 'express';
import caserecordsService from '../services/caserecords.service';

class CaseRecordsMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.startDate && req.body.endDate && req.body.minCount && req.body.maxCount) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields startDate and endDate and minCount and maxCount`,
      });
    }
  }
}

export default new CaseRecordsMiddleware();