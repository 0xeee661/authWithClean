import type { LoginUserDto } from "../dtos/auth/login-user.dto.js";
import type { RegisterUserDto } from "../dtos/auth/register-user.dto.js";
import type { UserEntity } from "../entities/user.entity.js";

export abstract class AuthRepository {

  abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  
}
