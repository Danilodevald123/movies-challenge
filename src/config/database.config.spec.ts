import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import databaseConfig from './database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

describe('Database Config', () => {
  let configService: ConfigService;
  const OLD_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...OLD_ENV };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
          envFilePath: '.env.test',
        }),
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    expect(configService).toBeDefined();
  });

  describe('database configuration', () => {
    it('should use environment variables when set', () => {
      process.env.DB_HOST = 'test-host';
      process.env.DB_PORT = '5432';
      process.env.DB_USERNAME = 'test-user';
      process.env.DB_PASSWORD = 'test-pass';
      process.env.DB_DATABASE = 'test-db';

      const config = databaseConfig();

      expect(config.database).toMatchObject({
        type: 'mysql',
        host: 'test-host',
        port: 5432,
        username: 'test-user',
        password: 'test-pass',
        database: 'test-db',
        synchronize: true,
      });
      expect(Array.isArray(config.database.entities)).toBe(true);
    });

    it('should use default values when env variables are not set', () => {
      delete process.env.DB_HOST;
      delete process.env.DB_PORT;
      delete process.env.DB_USERNAME;
      delete process.env.DB_PASSWORD;
      delete process.env.DB_DATABASE;

      const config = databaseConfig();

      expect(config.database).toMatchObject({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'movies_db',
        synchronize: true,
      });
      expect(Array.isArray(config.database.entities)).toBe(true);
    });
  });
});
