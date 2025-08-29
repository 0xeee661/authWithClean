import { JwtAdapter } from "../../../config/index.js";
import type { AuthRepository, LoginUserDto, RegisterUserDto } from "../../index.js";

interface UserToken {
  token: string,
  user: {
    id: string,
    name: string
    email: string
  }
} 

interface UserUseCases {
  create(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration: string) => Promise<string | null>;

export class UserUseCasesImpl implements UserUseCases {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ){}


  async create(registerUserDto: RegisterUserDto): Promise<UserToken> {

    const user = await this.authRepository.registerUser(registerUserDto);

    const token = await this.signToken({ id: user.id }, "2h");

    return {
      token: token!,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id }, "2h");
    return {
      token: token!,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
