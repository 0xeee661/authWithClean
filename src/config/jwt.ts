import jwt from "jsonwebtoken";
import { envs } from "./envs.js";

type Payload = { id: string, iat: number, exp: number }

export class JwtAdapter {

  static async generateToken(payload: Object, duration: string = "2h"): Promise<string | null> {
    return new Promise((resolve, reject)=> {
      // @ts-ignore
      jwt.sign(payload, envs.jwt_seed, { expiresIn: duration }, (err, token) => {
        if(err) return resolve(null);
       resolve(token!);
      });
    })
  }

  static validateToken<T>(token: string): Promise<T| null> {
    return new Promise((resolve)=> {
      // @ts-ignore
      jwt.verify(token, envs.jwt_seed, (err, decoded) => {
        if(err) return resolve(null);

       return resolve(decoded as T);
      })
    })
  }

}
