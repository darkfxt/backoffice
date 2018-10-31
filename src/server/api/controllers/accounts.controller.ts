import { Request, Response, NextFunction } from 'express';
import { AccountsService } from '../services/accounts.service';
import httpStatus = require('http-status');


export class AccountsController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await AccountsService.getAll(request.query, request.headers);
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

      const answer = await AccountsService.getDetail(request.params.id, request.query.lang, request.headers);
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);

      data.logo = (<any>request).files.map(value => ({
        key: value.key,
        source: 'S3',
        url: value.location
      }))[0];
      data.company_id = (<any>request).loggedUser.CompanyID;
      // TODO: Make a header for requests
      const user = await AccountsService.create(data, request.headers);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);
      const user = await AccountsService.update(request.params.id, data, request.headers);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await AccountsService.delete(request.params.id, request.headers);

      response.json(httpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

}
