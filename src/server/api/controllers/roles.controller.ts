import { Request, Response, NextFunction } from 'express';
import { RolesService } from '../services/roles.service';


export class RolesController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await RolesService.getAll(request.query, request.headers);
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        answer.data = answer.data.filter(role => role.name !== 'TAYLOR_ADMIN' && role.name !== 'ADMIN' && role.name !== 'OWNER');
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

      const answer = await RolesService.getDetail(request.params.id, request.query.lang, request.headers);
      console.log('*********', answer);
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

}
