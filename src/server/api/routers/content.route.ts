import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';

const ContentRouter: Router = Router();

ContentRouter.route('/languages')
  .get(ContentController.getAvailableLanguages);

ContentRouter.route('/languages/translate')
  .get(ContentController.getTranslation);

export default ContentRouter;
