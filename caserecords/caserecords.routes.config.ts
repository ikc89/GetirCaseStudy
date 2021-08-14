import express from 'express';

import { CommonRoutesConfig } from "../common/common.routes.config";
import CaseRecordsController from './controllers/caserecords.controller';
import CaseRecordsMiddleware from './middleware/caserecords.middleware';

export class CaseRecordsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CaseRecordRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/caserecords')
    .post(
      CaseRecordsMiddleware.validateRequiredUserBodyFields,
      CaseRecordsController.filterCaseRecords
    );

    return this.app;
  }
}