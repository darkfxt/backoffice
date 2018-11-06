import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import httpStatus = require('http-status');


export class UserController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      const answer = await UserService.getAll(request.query, request.headers);
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

      const answer = await UserService.getDetail(request.params.id, request.query.lang, request.headers);
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      // const data = JSON.parse(request.body);
      const user = await UserService.create(request.body, request.headers);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      // const data = JSON.parse(request.body);
      const user = await UserService.update(request.params.id, request.body, request.headers);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await UserService.delete(request.params.id, request.headers);

      response.json(httpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  public static async signInUser (request: Request, response: Response, next: NextFunction) {
    try {
      const {username, password} = request.body;
      const user = await UserService.signInUser(username, password, request.headers);
      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async refreshToken (request: Request, response: Response, next: NextFunction) {
    try {
      const user = await UserService.refreshToken(request.headers);
      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

}
