import * as jwt from 'jsonwebtoken';

const secret = 'TaylorGPSSecretKey';

export class AuthService {
  static getLoggedUser(token) {
    const decode = jwt.verify(token, secret);
    return decode;
  }
}
