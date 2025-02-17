import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { config } from 'dotenv';
import databaseConfig from './src/config/database.config';

config();

const dbConfig = databaseConfig().database;
const dataSourceOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: dbConfig.entities,
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
};

export default new DataSource(dataSourceOptions);
