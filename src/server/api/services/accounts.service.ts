import axios from 'axios';
import { config } from '../../config/env';
import * as FormData from 'form-data';


export class AccountsService {

  public static async getAll(query, headers): Promise<any> {
    return axios
      .get(`${config.core.url}/accounts`,  { params: query, headers: {authorization: headers.authorization}});
  }

  public static async create(body, headers): Promise<any> {
    const form = new FormData();
    body.primary_color = body.primary_color.replace('#', '');
    body.secondary_color = body.secondary_color.replace('#', '');

    form.append('name', body.name);
    form.append('company_id', body.company_id);
    form.append('primary_color', body.primary_color);
    form.append('secondary_color', body.secondary_color);
    form.append('file', body.file.buffer, {
      filename: body.file.originalname,
      contentType: body.file.mimetype,
      knownLength: body.file.size
    });
    const header = {...form.getHeaders(), ...{authorization: headers.authorization}};
    const resp = await axios.post(`${config.core.url}/accounts`, form, {headers: header});
    return resp;
  }

  public static async update(id, body, headers): Promise<any> {
    const form = new FormData();
    body.primary_color = body.primary_color.replace('#', '');
    body.secondary_color = body.secondary_color.replace('#', '');

    form.append('name', body.name);
    form.append('primary_color', body.primary_color);
    form.append('secondary_color', body.secondary_color);
    if (body.file)
      form.append('file', body.file.buffer, {
        filename: body.file.originalname,
        contentType: body.file.mimetype,
        knownLength: body.file.size
      });
    const header = {...form.getHeaders(), ...{authorization: headers.authorization}};
    return axios.put(`${config.core.url}/accounts/${id}`, form, {headers: header});
  }

  public static async delete(id, headers): Promise<any> {
    return axios.delete(`${config.core.url}/accounts/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail(id: string, lang: string = 'en', headers): Promise<any> {
    return axios.get(`${config.core.url}/accounts/${id}`, {headers: {authorization: headers.authorization}});
  }

}
