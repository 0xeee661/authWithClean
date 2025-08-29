import { Validators } from "../../../config/validations.js";

export class LoginUserDto {

  private constructor(
    public email: string,
    public password: string
  ) { }

  static login(data: { [key: string]: any }): [string | null, LoginUserDto | null] {

    const { email, password } = data;

    if (!email) return ["Email is required", null];
    if (!Validators.email.test(email)) return ["Email is invalid", null];
    if (!password) return ["Password is required", null];
    if (password.length < 6) return ["Password must be at least 6 characters", null];

    return [null, new LoginUserDto(email, password)];
  }
}
