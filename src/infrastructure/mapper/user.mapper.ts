import type { UserEntity } from "../../domain/index.js";

export class UserMapper{

  static userEntityForm(objet: { [key: string]: any }): UserEntity{
    const { id, _id, name, email, password, image, roles } = objet;

    if(!id || !_id)
      throw new Error("User id is required");

    if(!name) throw new Error("User name is required");
    if(!email) throw new Error("User email is required");
    if(!password) throw new Error("User password is required");
    if(!roles) throw new Error("User roles is required");

    return {
      id: id || _id,
      name,
      email,
      password,
      image,
      roles,
    }
  }
  
}
