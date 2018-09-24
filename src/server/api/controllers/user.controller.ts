import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';


export class UserController {

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({id: 1, name: 'Pepe', last_name: 'mujica', organization: '1', role: 'OWNER', email: 'asd@asd.com'});

      const data = await UserService.getDetail(request.params.id, request.query.lang);
      response.json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({data: [{id: 1, name: 'Pepe', last_name: 'mujica', organization: '1', role: 'OWNER', email: 'asd@asd.com'}]});
      const data = JSON.parse(request.body.data);
      const user = await UserService.create(data);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({data: [{id: 1, name: 'Pepe', last_name: 'mujica', organization: '1', role: 'OWNER', email: 'asd@asd.com'}]});
      const data = JSON.parse(request.body.data);
      const user = await UserService.update(request.params.id, data);

      response.json(user.data);
    } catch (err) {
      next(err);
    }
  }

}
