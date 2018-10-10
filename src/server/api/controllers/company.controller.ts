import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/company.service';


export class CompanyController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await CompanyService.getAll(request.query, request.headers);
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        answer.data = answer.data.filter(company => company.id === (<any>request).loggedUser.CompanyID);
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

      const answer = await CompanyService.getDetail(request.params.id, request.query.lang, request.headers);
      console.log('*********', answer);
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);
      const company = await CompanyService.create(data, request.headers);

      response.json(company.data);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);
      const company = await CompanyService.update(request.params.id, data, request.headers);

      response.json(company.data);
    } catch (err) {
      next(err);
    }
  }

}
