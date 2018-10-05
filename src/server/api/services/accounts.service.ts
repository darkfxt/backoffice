import axios from 'axios';
import { config } from '../../config/env';


export class AccountsService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search) {
      queryParams += `&search=${query.search}`;
    }
    return axios
      .get(`${config.core.url}/accounts`, {headers});
  }

  public static async create(body): Promise<any> {
    const resp = await axios.post(`${config.core.url}/accounts`, body);
    return resp;
  }

  public static async update(id, body): Promise<any> {
    return axios.patch(`${config.core.url}/accounts/${id}`, body);
  }

  public static async getDetail(id: string, lang: string = 'en'): Promise<any> {
    return axios.get(`${config.core.url}/accounts/${id}`);
  }

}
