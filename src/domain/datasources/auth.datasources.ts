import type { RegisterUserDto } from "../dtos/auth/register-user.dto.js";
import type { UserEntity } from "../entities/user.entity.js";

export abstract class AuthDataSources {

  abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}
