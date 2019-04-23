import { Router } from 'express';
import { CommentsController } from '../controllers/comments.controller';

const CommentsRouter: Router = Router();

CommentsRouter.route('/')
  .post(CommentsController.create);

export default CommentsRouter;
