import axios from 'axios';
import {config} from '../../config/env';


export class TripTemplateService {

  public static async getAll(query): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if(query.search){
      queryParams += `&search=${query.search}`;
    }
    console.log(`${config.routes.url}/trip-templates${queryParams}`);
    return axios
      .get(`${config.routes.url}/trip-templates${queryParams}`);
  }

  public static async create(tripTemplate): Promise<any> {
    return axios.post(`${config.routes.url}/trip-templates`, tripTemplate);
  }

  public static async update(id, body): Promise<any> {
    return axios.patch(`${config.routes.url}/trip-templates/${id}`, body);
  }

  public static async getDetail(id: string, lang: string = 'en'): Promise<any> {
    return axios.get(`${config.routes.url}/trip-templates/${id}?lang=${lang}`);
  }

}
