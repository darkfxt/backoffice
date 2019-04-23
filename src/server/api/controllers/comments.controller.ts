import { Request, Response, NextFunction } from 'express';
import httpStatus = require('http-status');
import { CommentsService } from '../services/comments.service';


export class CommentsController {

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = request.body;

      data.loggedUser = (<any>request).loggedUser;
      const answer = await CommentsService.create(data, request.headers);
      if (answer.MessageId)
        response.json(answer.MessageId);
      else
        response.status(400);
    } catch (err) {
      next(err);
    }
  }

}
