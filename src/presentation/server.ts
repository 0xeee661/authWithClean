import express from "express";
import { envs } from "../config/index.js";

export class Server {

  public readonly app: express.Application = express();
  public readonly port: number;

  constructor(options: Options){
    const {port = envs.port} = options;
    this.port = port;
  }

  async start(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

interface Options {
  port?: number
}
