import { Router } from 'express';
import { AccountsrController } from '../controllers/accounts.controller';
import { S3Middleware } from '../../middlewares/s3.middleware';

const AccountsRouter: Router = Router();
const s3Middleware: S3Middleware = new S3Middleware({bucket: 'accounts'});


AccountsRouter.route('/:id')
  .get(AccountsrController.getDetail)
  .patch([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], AccountsrController.update);

AccountsRouter.route('/')
  .post([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], AccountsrController.create);

export default AccountsRouter;
