import axios from 'axios';
import { config } from '../../config/env';

export class RoutesService {

  public static async getAll(query): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search) {
      queryParams += `&search=${query.search}`;
    }
    return axios
      .get(`${config.routes.url}/segments${queryParams}`);
  }

  public static async create(route): Promise<any> {
    if (route._id) Reflect.deleteProperty(route, '_id');
    const ret = await axios.post(`${config.routes.url}/segments`, route);
    console.log(ret.data);
    return ret.data;
  }

  public static async update(id, body): Promise<any> {
    try {
      return await axios.patch(`${config.routes.url}/segments/${id}`, body);
    } catch (error) {
      throw error;
    }
  }

  public static async getDetail(id: string, lang: string = 'en'): Promise<any> {
    return axios
      .get(`${config.routes.url}/segments/${id}?lang=${lang}`)
      .then(resp => {
        return resp.data;
      });
  }

}
