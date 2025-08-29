import type { Request, Response } from "express";
import { CustomErrors, LoginUserDto, RegisterUserDto, UserUseCasesImpl } from "../../domain/index.js";
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
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if(error) return res.status(400).json({ error });

    const userUseCases = new UserUseCasesImpl(this.authRepository);

    userUseCases.login(loginUserDto!)
    .then(user => res.json(user))
    .catch(error => this.handlerError(error, res));
  }

  register(req: Request, res: Response){
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if(error) return res.status(400).json({ error });

    const userUseCases  = new UserUseCasesImpl(this.authRepository);

    userUseCases.create(registerUserDto!)
    .then(user => res.json(user))
    .catch(error => this.handlerError(error, res));

  }

  getUsers(req: Request, res: Response){
    UserModel.find()
    .then(users => res.json({token: req.body.payload}))
    .catch(error => this.handlerError(error, res));
  }

}
