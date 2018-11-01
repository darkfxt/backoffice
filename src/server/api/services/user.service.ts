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
      .get(`${config.idm.url}/users`, {params: query, headers: {authorization: headers.authorization}});
  }

  public static async create(body, headers: any): Promise<any> {
    body.role = body.role.id;

    const resp = await axios.post(`${config.idm.url}/signup`, body, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async update(id, body, headers: any): Promise<any> {
    body.role = body.role.id;
    return axios.patch(`${config.idm.url}/users/${id}`, body, {headers: {authorization: headers.authorization}});
  }

  public static async delete(id, headers: any): Promise<any> {
    return axios.delete(`${config.idm.url}/users/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail(id: string, lang: string = 'en', headers: any): Promise<any> {
    return axios.get(`${config.idm.url}/users/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async signInUser(email: string, password: string, headers: any): Promise<any> {
    return axios.post(`${config.idm.url}/signin`, {username: email, password});
  }

  public static async refreshToken(headers: any): Promise<any> {
    return axios.get(`${config.idm.url}/refresh-token`, {headers: {authorization: headers.authorization}});
  }

  public static async signOutUser(headers: any): Promise<any> {
    return axios.get(`${config.idm.url}/signout`, {headers: {authorization: headers.authorization}});
  }

}
