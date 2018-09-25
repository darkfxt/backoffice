import axios from 'axios';
import { config } from '../../config/env';


export class AccountsService {

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
