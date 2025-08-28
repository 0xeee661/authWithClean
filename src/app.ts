import { Server } from './presentation/server.js';
import { envs } from './config/index.js';

(async () => {
  await main();
})();

async function main() {
  // DB handler 

  // Server
  new Server({port: 4001}).start();
}
