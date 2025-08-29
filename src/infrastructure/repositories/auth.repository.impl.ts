import { 
  AuthDataSources, 
  AuthRepository, 
  LoginUserDto, 
  RegisterUserDto, 
  UserEntity } from "../../domain/index.js";

export class AuthRepositoryImpl implements AuthRepository{

  constructor(
    private readonly authDataSource: AuthDataSources
  ){}

  registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.registerUser(registerUserDto);
  }

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.login(loginUserDto);
  }

}
