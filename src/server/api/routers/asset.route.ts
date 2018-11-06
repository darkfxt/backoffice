import { Router } from 'express';
import { AssetsController } from '../controllers/assets.controller';

const AssetsRouter: Router = Router();

AssetsRouter.route('/:id')
  .get(AssetsController.getDetail)
  .delete(AssetsController.delete)
  .patch(AssetsController.update);

AssetsRouter.route('/')
  .get(AssetsController.getAll)
  .post(AssetsController.create);

export default AssetsRouter;
