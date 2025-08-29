import { BcryptAdapter } from "../../config/bcrypt.js";
import { UserModel } from "../../data/mongodb/index.js";
import { CustomErrors, AuthDataSources, RegisterUserDto, UserEntity } from "../../domain/index.js";
import { UserMapper } from "../mapper/user.mapper.js";

type  hashPassword = (password: string) => string;
type comparePassword = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSources {

  constructor(
    private readonly hashPassword: hashPassword = BcryptAdapter.hash,
    private readonly comparePassword: comparePassword = BcryptAdapter.compare
  ){} 

  async registerUser(resgisterUserDto: RegisterUserDto): Promise<UserEntity> {
    try {
      const { name, email, password } = resgisterUserDto;
      //1 Validation if the mail exists on DB
      const userExists = await UserModel.findOne({ email: email });
      if(userExists) throw CustomErrors.badRequest("User already exists");
      
      const user = await UserModel.create({ name, email, password: this.hashPassword(password) });


      await user.save();
      //3 Mapping ruser response

      return UserMapper.userEntityForm(user);

      
    } catch (error) {
      if( error instanceof CustomErrors ) throw error;
      throw CustomErrors.internal();
    }
  }

}

