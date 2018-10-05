import { Router } from 'express';
import {UserController} from '../controllers/user.controller';

const UserRouter: Router = Router();



UserRouter.route('/signin')
  .post(UserController.signInUser);

UserRouter.route('/:id')
  .get(UserController.getDetail)
  .patch(UserController.update);

UserRouter.route('/')
  .get(UserController.getAll)
  .post(UserController.create);

export default UserRouter;
