import axios from 'axios';
import {config} from '../../config/env';


export class RoutesService {

  public static async create(route): Promise<any> {
    return axios.post(`${config.routes.url}/segments`, route);
  }

}
