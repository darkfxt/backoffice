import axios from 'axios';
import { config } from '../../config/env';


export class CompanyService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search) {
      queryParams += `&search=${query.search}`;
    }
    return axios
      .get(`${config.core.url}/companies`, {headers});
  }

  public static async create(body, headers: any): Promise<any> {
    const resp = await axios.post(`${config.core.url}/companies`, body, {headers});
    return resp;
  }

  public static async update(id, body, headers: any): Promise<any> {
    return axios.patch(`${config.core.url}/companies/${id}`, body, {headers});
  }

  public static async getDetail(id: string, lang: string = 'en', headers: any): Promise<any> {
    return axios.get(`${config.core.url}/companies/${id}`, {headers});
  }

}
