import { Request, Response, NextFunction } from 'express';
import { AssetsService } from '../services/assets.service';
import httpStatus = require('http-status');


export class AssetsController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      const answer = await AssetsService.getAll(request.query, request.headers);
      if (request.query.simple) {
        response.json(answer.data.data);
        return;
      }
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await AssetsService.getDetail(request.params.id, request.query.lang, request.headers);
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      // if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
      request.body.company_id = (<any>request).loggedUser.CompanyID;
      const user = await AssetsService.create(request.body, request.headers);
      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await AssetsService.update(request.params.id, request.body, request.headers);
      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await AssetsService.delete(request.params.id, request.headers);
      response.json(httpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

}
