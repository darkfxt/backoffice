import { Router } from 'express';
import { RolesController } from '../controllers/roles.controller';

const RolesRouter: Router = Router();


RolesRouter.route('/:id')
  .get(RolesController.getDetail);

RolesRouter.route('/')
  .get(RolesController.getAll);

export default RolesRouter;
