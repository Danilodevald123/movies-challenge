import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;
  let httpService: HttpService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockRepository,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const movies = [
        { 
          id: '1', 
          title: 'Movie 1',
          episodeId: 1,
          openingCrawl: 'Opening 1',
          director: 'Director 1',
          producer: 'Producer 1',
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
        { 
          id: '2', 
          title: 'Movie 2',
          episodeId: 2,
          openingCrawl: 'Opening 2',
          director: 'Director 2',
          producer: 'Producer 2',
          releaseDate: new Date(),
          characters: [],
          planets: [],
          starships: [],
          vehicles: [],
          species: [],
          swApiUrl: 'https://swapi.dev/api/films/2/',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      mockRepository.find.mockResolvedValue(movies);

      const result = await service.findAll();

      expect(result).toEqual(movies);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a movie by id', async () => {
      const movie = { 
        id: '1', 
        title: 'Movie 1',
        episodeId: 1,
        openingCrawl: 'Opening 1',
        director: 'Director 1',
        producer: 'Producer 1',
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
      mockRepository.findOne.mockResolvedValue(movie);

      const result = await service.findOne('1');

      expect(result).toEqual(movie);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when movie is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const createMovieDto = {
        title: 'New Movie',
        episodeId: 1,
        openingCrawl: 'A long time ago in a galaxy far, far away...',
        director: 'Director',
        producer: 'Producer',
        releaseDate: new Date(),
      };
      const newMovie = { id: '1', ...createMovieDto };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(newMovie);
      mockRepository.save.mockResolvedValue(newMovie);

      const result = await service.create(createMovieDto);

      expect(result).toEqual(newMovie);
      expect(mockRepository.create).toHaveBeenCalledWith(createMovieDto);
      expect(mockRepository.save).toHaveBeenCalledWith(newMovie);
    });

    it('should throw BadRequestException when movie with episode ID already exists', async () => {
      const createMovieDto = {
        title: 'New Movie',
        episodeId: 1,
        openingCrawl: 'A long time ago in a galaxy far, far away...',
        director: 'Director',
        producer: 'Producer',
        releaseDate: new Date(),
      };

      mockRepository.findOne.mockResolvedValue({ id: '1', ...createMovieDto });

      await expect(service.create(createMovieDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateMovieDto = { title: 'Updated Movie' };
      const existingMovie = {
        id: '1',
        title: 'Old Movie',
        episodeId: 1,
      };
      const updatedMovie = { ...existingMovie, ...updateMovieDto };

      mockRepository.findOne.mockResolvedValue(existingMovie);
      mockRepository.save.mockResolvedValue(updatedMovie);

      const result = await service.update('1', updateMovieDto);

      expect(result).toEqual(updatedMovie);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedMovie);
    });

    it('should throw BadRequestException when updating to an existing episodeId', async () => {
      const movieToUpdate = {
        id: '1',
        title: 'Movie 1',
        episodeId: 1,
      };

      const updateMovieDto = {
        episodeId: 2,
      };

      const existingMovieWithEpisodeId = {
        id: '2',
        title: 'Movie 2',
        episodeId: 2,
      };

      mockRepository.findOne
        .mockResolvedValueOnce(movieToUpdate)
        .mockResolvedValueOnce(existingMovieWithEpisodeId);

      await expect(service.update('1', updateMovieDto))
        .rejects
        .toThrow(BadRequestException);
      
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });

    it('should allow updating episodeId when no other movie has that episodeId', async () => {
      const movieToUpdate = {
        id: '1',
        title: 'Movie 1',
        episodeId: 1,
      };

      const updateMovieDto = {
        episodeId: 2,
      };

      const updatedMovie = {
        ...movieToUpdate,
        ...updateMovieDto,
      };

      mockRepository.findOne
        .mockResolvedValueOnce(movieToUpdate)
        .mockResolvedValueOnce(null);

      mockRepository.save.mockResolvedValue(updatedMovie);

      const result = await service.update('1', updateMovieDto);

      expect(result).toEqual(updatedMovie);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedMovie);
    });

    it('should allow updating other fields without checking episodeId', async () => {
      const movieToUpdate = {
        id: '1',
        title: 'Movie 1',
        episodeId: 1,
      };

      const updateMovieDto = {
        title: 'Updated Title',
      };

      const updatedMovie = {
        ...movieToUpdate,
        ...updateMovieDto,
      };

      mockRepository.findOne.mockResolvedValue(movieToUpdate);
      mockRepository.save.mockResolvedValue(updatedMovie);

      const result = await service.update('1', updateMovieDto);

      expect(result).toEqual(updatedMovie);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1); 
      expect(mockRepository.save).toHaveBeenCalledWith(updatedMovie);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      const movie = { 
        id: '1', 
        title: 'Movie 1',
        episodeId: 1,
        openingCrawl: 'Opening 1',
        director: 'Director 1',
        producer: 'Producer 1',
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
      mockRepository.findOne.mockResolvedValue(movie);

      await service.remove('1');

      expect(mockRepository.remove).toHaveBeenCalledWith(movie);
    });
  });

  describe('syncWithStarWarsApi', () => {
    it('should sync movies from Star Wars API', async () => {
      const mockApiResponse = {
        data: {
          results: [{
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl: 'Text...',
            director: 'George Lucas',
            producer: 'Gary Kurtz',
            release_date: '1977-05-25',
            characters: ['url1', 'url2'],
            planets: ['url1'],
            starships: ['url1'],
            vehicles: ['url1'],
            species: ['url1'],
            url: 'https://swapi.dev/api/films/1/',
          }],
        },
      };

      mockHttpService.get.mockReturnValue(of(mockApiResponse));
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockImplementation((dto) => dto);
      mockRepository.save.mockImplementation((movie) => movie);

      await service.syncWithStarWarsApi();

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException when API sync fails', async () => {
      mockHttpService.get.mockReturnValue(of(Promise.reject(new Error())));

      await expect(service.syncWithStarWarsApi()).rejects.toThrow(BadRequestException);
    });
  });
});
