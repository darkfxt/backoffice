import { fourOFour } from './middlewares/404-middleware';

const PORT = 5000;

import * as express from 'express';
import * as cors from 'cors';
// import * as compression from 'compression';
import api from './api';
import * as httpStatus from 'http-status';
import * as morgan from 'morgan';
import * as healthcheck from 'express-healthcheck';

const env = process.env.NODE_ENV;
const server: express.Application = express();
console.log(env);
server.disable('x-powered-by');
// logs to console minimal information
// :method :url :statusCode :time :content length
if (env === 'development' || env === 'local') {
  server.use(morgan('dev'));
}

// server.use(compression({ threshold: 0 }));
server.use(cors());

// Add healthcheck endpoint
server.get('/health', healthcheck());

// api routes
server.use('/api', api);

server.use(fourOFour);

server.use((req: express.Request, res: express.Response) => {
  if (res.statusCode === httpStatus.NOT_FOUND) {
    res.json({
      message: httpStatus[httpStatus.NOT_FOUND],
    });
  }
});

server.listen(PORT, () => {
  console.log('App server listening on port ' + PORT);
});

export { server };
