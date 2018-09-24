import axios from 'axios';
import { config } from '../../config/env';


export class UserService {

  public static async create(body): Promise<any> {
    const resp = await axios.post(`${config.idm.url}/users`, body);
    return resp;
  }

  public static async update(id, body): Promise<any> {
    return axios.patch(`${config.idm.url}/users/${id}`, body);
  }

  public static async getDetail(id: string, lang: string = 'en'): Promise<any> {
    return axios.get(`${config.idm.url}/users/${id}`);
  }

}
