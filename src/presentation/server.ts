import express, { Router } from "express";
import { envs } from "../config/index.js";
import { AppRoutes } from "./routes.js";

export class Server {

  public readonly app: express.Application = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options){
    const {port, routes} = options;
    this.port = port;
    this.routes = routes;
  }

  async start(): Promise<void> {

    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Init routes
    this.app.use(this.routes);

    // Start server
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

interface Options {
  port: number
  routes: Router
}
