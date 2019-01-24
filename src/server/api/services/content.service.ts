import axios from 'axios';
import { config } from '../../config/env';
import * as FormData from 'form-data';

export class ContentService {
  public static async getTranslation(source_lang: string, target_lang: string, text: string, headers): Promise<any> {
    return axios
      .get(`${config.content.url}/languages/translate`,
        { params: {
                    source_lang,
                    target_lang,
                    text
                  },
                 headers: {authorization: headers.authorization}});
  }

  public static async getAvailableLanguages(headers): Promise<any> {
    return axios
      .get(`${config.content.url}/languages`, {headers: {authorization: headers.authorization}});
  }
}
