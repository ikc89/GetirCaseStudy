import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import * as swaggerDocument from './swagger.json';

import { CommonRoutesConfig } from './common/common.routes.config';
import { CaseRecordsRoutes } from './caserecords/caserecords.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());

app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

const swaggerUi = require('swagger-ui-express');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.push(new CaseRecordsRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
      console.log(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});

export default server;