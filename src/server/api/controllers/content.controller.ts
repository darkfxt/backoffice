import { Request, Response, NextFunction } from 'express';
import { ContentService } from '../services/content.service';

export class ContentController {
  public static async getTranslation(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const answer = await ContentService.getTranslation(
        request.query.source_lang,
        request.query.target_lang,
        request.query.text,
        request.headers);
      response.json(answer.data);
    } catch (err) {
      next(err);
    }

  }

  public static async getAvailableLanguages(request: Request, response: Response, next: NextFunction): Promise<any> {
    const answer = await ContentService.getAvailableLanguages(request.headers);
    response.json(answer.data);
  }
}
