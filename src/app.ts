import { Server } from './presentation/server.js';
import { envs } from './config/index.js';
import { AppRoutes } from './presentation/routes.js';
import { env } from 'process';
import { MongoDatabase } from './data/mongodb/mongo-database.js';

(async () => {
  await main();
})();

async function main() {
  // DB handler 
  await new MongoDatabase().connect({
    url: envs.db_url,
    dbName: envs.db_name
  });

  // Server
  const serverConfig = { 
    port: envs.port, 
    routes: AppRoutes.routes }

  new Server(serverConfig).start();
}
