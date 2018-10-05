import { Request, Response, NextFunction } from 'express';
import { AccountsService } from '../services/accounts.service';


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
      return response.json({id: 1, name: 'Pepe', last_name: 'mujica', company_id: '1', role: 'OWNER', email: 'asd@asd.com'});

      const data = await AccountsService.getDetail(request.params.id, request.query.lang);
      response.json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({data: [{id: 1, name: 'Pepe', last_name: 'mujica', company_id: '1', role: 'OWNER', email: 'asd@asd.com'}]});
      const data = JSON.parse(request.body.data);
      const user = await AccountsService.create(data);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({data: [{id: 1, name: 'Pepe', last_name: 'mujica', company_id: '1', role: 'OWNER', email: 'asd@asd.com'}]});
      const data = JSON.parse(request.body.data);
      const user = await AccountsService.update(request.params.id, data);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

}
