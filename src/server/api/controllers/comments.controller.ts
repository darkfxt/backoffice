import { Request, Response, NextFunction } from 'express';
import httpStatus = require('http-status');
import { CommentsService } from '../services/comments.service';


export class CommentsController {

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);

      data.company_id = (<any>request).loggedUser.CompanyID;
      const user = await CommentsService.create(data, request.headers);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

}
