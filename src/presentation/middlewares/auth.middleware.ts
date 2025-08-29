import type { NextFunction, Request, Response } from "express";

export class AuthMiddleware {

  static async validateJWT(req: Request, res: Response, next: NextFunction){
    console.log("validateJWT", req.headers);
    const autorization = req.header("Authorization")
    if(!autorization){
      return res.status(401).json({ error: "Unauthorized" });
    } 
    if(!autorization.startsWith("Bearer ")){
      return res.status(401).json({ error: "Invalid barer token" });
    }
    
    const token = autorization.split(" ").at(1) || "";

    try {
 
      req.body.token = token;
      
      next();
    } catch (error) {
     res.status(401).json({ error: "ERROR IN THE MIDDLEWARE" });
    }
  }

}


