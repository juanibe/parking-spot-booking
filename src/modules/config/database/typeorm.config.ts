import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${+process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [`${process.env.API_PATH}/**/*.entity{.ts,.js}`],
  migrations: [
    `${process.env.API_PATH}/modules/config/database/migrations/*{.ts,.js}`,
  ],
  autoLoadEntities: false,
  synchronize: false,
  logging: process.env.NODE_ENV === 'local',
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
