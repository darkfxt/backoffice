import axios from 'axios';
import {config} from '../../config/env';


export class RoutesService {

  public static async create(route): Promise<any> {
    return axios.post(`${config.routes.url}/segments`, route);
  }

  public static async update(id, body): Promise<any> {
    return axios.patch(`${config.routes.url}/segments/${id}`, body);
  }

  public static async getDetail(id: string, lang: string = 'en'): Promise<any> {
    return axios.get(`${config.routes.url}/segments/${id}?lang=${lang}`);
  }

}
