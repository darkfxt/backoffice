import { Router } from 'express';
import { AccountsController } from '../controllers/accounts.controller';
import { S3Middleware } from '../../middlewares/s3.middleware';

const AccountsRouter: Router = Router();
const s3Middleware: S3Middleware = new S3Middleware({bucket: 'accounts'});


AccountsRouter.route('/:id')
  .get(AccountsController.getDetail)
  .patch([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], AccountsController.update);

AccountsRouter.route('/')
  .get(AccountsController.getAll)
  .post([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], AccountsController.create);

export default AccountsRouter;
