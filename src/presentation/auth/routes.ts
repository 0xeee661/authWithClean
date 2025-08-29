import { Router } from "express";
import { AuthController } from "./controller.js";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


export class AuthRoutes {

  static get routes (): Router{
    const router = Router();
    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);

    const controller = new AuthController(authRepository);

    router.get('/login', controller.login.bind(controller));

    router.post('/register', controller.register.bind(controller));

    router.get('/getUsers', [AuthMiddleware.validateJWT],controller.getUsers.bind(controller));

    return router;
  }


}
