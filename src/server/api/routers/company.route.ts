import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';

const CompanyRouter: Router = Router();

CompanyRouter.route('/:id')
  .get(CompanyController.getDetail)
  .patch(CompanyController.update);

CompanyRouter.route('/')
  .get(CompanyController.getAll)
  .post(CompanyController.create);

export default CompanyRouter;
