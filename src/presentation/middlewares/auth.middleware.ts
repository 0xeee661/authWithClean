import type { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.js";
import { UserModel } from "../../data/mongodb/index.js";

export class AuthMiddleware {

  static async validateJWT(req: Request, res: Response, next: NextFunction){
    const autorization = req.header("Authorization")
    if(!autorization){
      return res.status(401).json({ error: "Unauthorized" });
    } 
    if(!autorization.startsWith("Bearer ")){
      return res.status(401).json({ error: "Invalid barer token" });
    }
    
    const token = autorization.split(" ").at(1) || "";

    try {
 
      const payload = await JwtAdapter.validateToken<{id: string}>(token);
      if(!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserModel.findById(payload.id);
      if(!user) return res.status(401).json({ error: "User not found" });

      if (!req.body) req.body = {};
      req.body.user = user;

      next();
    } catch (error) {
      console.log(error)
     res.status(401).json({ error: "ERROR IN THE MIDDLEWARE" });
    }
  }

}
