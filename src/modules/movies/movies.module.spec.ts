import { Test, TestingModule } from '@nestjs/testing';
import { MoviesModule } from './movies.module';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';

jest.setTimeout(30000);

describe('MoviesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          autoLoadEntities: true,
          synchronize: true,
          entities: [Movie, User],
        }),
        TypeOrmModule.forFeature([Movie]),
        HttpModule,
      ],
      providers: [
        MoviesService,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn(),
            hasMetadata: jest.fn(() => true),
            getMetadata: jest.fn(() => ({})),
            getRepository: jest.fn(() => mockRepository),
            initialize: jest.fn(),
            destroy: jest.fn(),
            isInitialized: true,
          },
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: mockRepository,
        },
      ],
    }).compile();
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
