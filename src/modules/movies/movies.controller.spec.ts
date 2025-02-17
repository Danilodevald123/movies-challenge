import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  // Mock del servicio de películas
  const mockMoviesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    syncWithStarWarsApi: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = [
        {
          id: '1',
          title: 'Test Movie',
          episodeId: 1,
          openingCrawl: 'Test Opening',
          director: 'Test Director',
          producer: 'Test Producer',
          releaseDate: new Date(),
          characters: [],
          planets: [],
          starships: [],
          vehicles: [],
          species: [],
          swApiUrl: 'https://swapi.dev/api/films/1/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single movie', async () => {
      const result = {
        id: '1',
        title: 'Test Movie',
        episodeId: 1,
        openingCrawl: 'Test Opening',
        director: 'Test Director',
        producer: 'Test Producer',
        releaseDate: new Date(),
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        swApiUrl: 'https://swapi.dev/api/films/1/',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'New Movie',
        episodeId: 1,
        openingCrawl: 'Test Opening',
        director: 'Test Director',
        producer: 'Test Producer',
        releaseDate: new Date(),
      };

      const result = {
        id: '1',
        ...createMovieDto,
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        swApiUrl: 'https://swapi.dev/api/films/1/',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createMovieDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createMovieDto);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Movie',
      };

      const result = {
        id: '1',
        title: 'Updated Movie',
        episodeId: 1,
        openingCrawl: 'Test Opening',
        director: 'Test Director',
        producer: 'Test Producer',
        releaseDate: new Date(),
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        swApiUrl: 'https://swapi.dev/api/films/1/',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateMovieDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith('1', updateMovieDto);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('syncMovies', () => {
    it('should sync movies with Star Wars API', async () => {
      jest.spyOn(service, 'syncWithStarWarsApi').mockResolvedValue(undefined);

      await controller.syncMovies();
      expect(service.syncWithStarWarsApi).toHaveBeenCalled();
    });
  });
});
