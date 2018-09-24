import { Router } from 'express';
import {UserController} from '../controllers/user.controller';

const UserRouter: Router = Router();



UserRouter.route('/:id')
  .get(UserController.getDetail)
  .patch(UserController.update);

UserRouter.route('/')
  .post(UserController.create);

export default UserRouter;
