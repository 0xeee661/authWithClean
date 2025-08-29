import 'dotenv/config';

export const envs = {
  port: Number(process.env.PORT) || 3100,
  db_url: process.env.DB_URL as string,
  db_name: process.env.DB_NAME as string,
  jwt_seed: process.env.JWT_SEED || 'SEED',
}
