import type { Request, Response } from "express";
import { CustomErrors, RegisterUserDto } from "../../domain/index.js";
import { AuthRepository } from "../../domain/index.js";
import { JwtAdapter } from "../../config/jwt.js";
import { UserModel } from "../../data/mongodb/index.js";

export class AuthController {
  private readonly authRepository: AuthRepository

  constructor(
    authRepository: AuthRepository
  ){
    this.authRepository = authRepository;
  }

  private handlerError(error: unknown, res: Response){
    if(error instanceof CustomErrors){
      return res.status(error.code).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }

  login(req: Request, res: Response){
    return res.json("LOGIN CONTROLLER");
  }

  register(req: Request, res: Response){
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if(error) return res.status(400).json({ error });

    this.authRepository.registerUser(registerUserDto!)
    .then(async(user) => {

      const token = await JwtAdapter.generateToken({ id: user.id });
      return res.json({ user, token });
    })
    .catch(error => this.handlerError(error, res));

  }

  getUsers(req: Request, res: Response){
    UserModel.find()
    .then(users => res.json({users, token: req.body.token}))
    .catch(error => this.handlerError(error, res));
  }

}
