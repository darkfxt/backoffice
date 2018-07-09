import axios from 'axios';
import {config} from '../../config/env';


export class RoutesService {

  public static async create(body): Promise<any> {
    return axios.post(`${config.geo.url}/routes`, body);
  }

}
