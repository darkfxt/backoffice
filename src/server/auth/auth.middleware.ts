import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { AuthService } from './auth.service';

const methodMap = {
  GET: 'view',
  POST: 'create',
  PUT: 'edit',
  PATCH: 'edit',
  DELETE: 'delete'
};

export function authentication(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    (<any>req).loggedUser = AuthService.getLoggedUser(token);
    next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).send(error);
  }

}

export function authorization(entity) {
  const _entity = entity;
  return (req: Request, res: Response, next: NextFunction) => {
    const resource = (<any>req).loggedUser.Resources.find(item => item.name === _entity);
    const method = req.method;

    if (resource && resource[methodMap[method]])
      next();
    else
      res.status(httpStatus.FORBIDDEN).send(`You don have permission to ${methodMap[method]} this resource`);
  };
}
