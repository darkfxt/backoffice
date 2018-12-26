import { Router } from 'express';
import { AccountsController } from '../controllers/accounts.controller';
import { S3Middleware } from '../../middlewares/s3.middleware';

const AccountsRouter: Router = Router();
const s3Middleware: S3Middleware = new S3Middleware({bucket: 'accounts'});


AccountsRouter.route('/:id')
  .get(AccountsController.getDetail)
  .delete(AccountsController.delete)
  .patch([s3Middleware.upload().array('files[]')], AccountsController.update);

AccountsRouter.route('/')
  .get(AccountsController.getAll)
  .post([s3Middleware.upload().array('files[]')], AccountsController.create);

export default AccountsRouter;
