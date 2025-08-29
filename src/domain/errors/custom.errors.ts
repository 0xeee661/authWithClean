export class CustomErrors extends Error {


  constructor(
    public readonly code: number,
    public readonly message: string
  ){
    super(message)
  }

  static badRequest(message: string){
    return new CustomErrors(400, message);
  }

  static unauthorized(message: string){
    return new CustomErrors(401, message);
  }

  static notFound(message: string){
    return new CustomErrors(404, message);
  }

  static forbidden(message: string){
    return new CustomErrors(403, message);
  }

  static internal(message: string = "Internal server error"){
    return new CustomErrors(500, message);
  }

}
