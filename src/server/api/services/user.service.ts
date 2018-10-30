import axios from 'axios';
import { config } from '../../config/env';


export class UserService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    // tslint:disable-next-line:curly
    if (query.search) {
      queryParams += `&search=${query.search}`;
    }
    return axios
      .get(`${config.idm.url}/users`, {params: query, headers});
  }

  public static async create(body, headers: any): Promise<any> {
    body.role = body.role.id;

    const resp = await axios.post(`${config.idm.url}/signup`, body, {headers});
    return resp;
  }

  public static async update(id, body, headers: any): Promise<any> {
    body.role = body.role.id;
    return axios.patch(`${config.idm.url}/users/${id}`, body, {headers});
  }

  public static async getDetail(id: string, lang: string = 'en', headers: any): Promise<any> {
    return axios.get(`${config.idm.url}/users/${id}`, {headers});
  }

  public static async signInUser(email: string, password: string, headers: any): Promise<any> {
    return axios.post(`${config.idm.url}/signin`, {username: email, password}, {headers});
  }

  public static async refreshToken(headers: any): Promise<any> {
    return axios.get(`${config.idm.url}/refresh-token`, {headers});
  }

  public static async signOutUser(headers: any): Promise<any> {
    return axios.get(`${config.idm.url}/signout`, {headers});
  }

}
