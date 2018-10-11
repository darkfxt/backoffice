import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import {AuthService} from '../../auth/auth.service';


export class UserController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
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

  public static async signInUser (request: Request, response: Response, next: NextFunction) {
    try {
      const {username, password} = request.body;
      const user = await UserService.signInUser(username, password, request.headers);
      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

}
