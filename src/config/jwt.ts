import jwt from "jsonwebtoken";
import { envs } from "./envs.js";

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

}
