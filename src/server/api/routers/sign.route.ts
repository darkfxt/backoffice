import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const SignRouter: Router = Router();

SignRouter.route('/signin')
  .post(UserController.signInUser);

export default SignRouter;

