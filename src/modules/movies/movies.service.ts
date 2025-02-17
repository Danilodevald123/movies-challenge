import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

import { Movie } from './entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { MovieValidator } from './validators/movie.validator';

@Injectable()
export class MoviesService {
  private readonly swApiUrl = 'https://swapi.dev/api';

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    MovieValidator.validate(createMovieDto);

    const existingMovie = await this.movieRepository.findOne({
      where: { episodeId: createMovieDto.episodeId }
    });

    if (existingMovie) {
      throw new BadRequestException(`A movie with episode ID ${createMovieDto.episodeId} already exists`);
    }

    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    
    MovieValidator.validate(updateMovieDto);

    if (updateMovieDto.episodeId !== undefined) {
      const existingMovie = await this.movieRepository.findOne({
        where: { episodeId: updateMovieDto.episodeId }
      });

      if (existingMovie && existingMovie.id !== id) {
        throw new BadRequestException(`A movie with episode ID ${updateMovieDto.episodeId} already exists`);
      }
    }

    Object.assign(movie, updateMovieDto);
    return this.movieRepository.save(movie);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async syncWithStarWarsApi(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.swApiUrl}/films`),
      );
  
      const films = response.data.results;
      for (const film of films) {
        const existingMovie = await this.movieRepository.findOne({
          where: { swApiUrl: film.url },
        });
  
        const movieData = {
          title: film.title,
          episodeId: film.episode_id,
          openingCrawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          releaseDate: new Date(film.release_date),
          characters: Array.isArray(film.characters) ? film.characters : [],
          planets: Array.isArray(film.planets) ? film.planets : [],
          starships: Array.isArray(film.starships) ? film.starships : [],
          vehicles: Array.isArray(film.vehicles) ? film.vehicles : [],
          species: Array.isArray(film.species) ? film.species : [],
          swApiUrl: film.url,
        };
  
        if (existingMovie) {
          await this.movieRepository.save({ ...existingMovie, ...movieData });
        } else {
          const newMovie = this.movieRepository.create(movieData);
          await this.movieRepository.save(newMovie);
        }
      }
    } catch (error) {
      throw new BadRequestException('Failed to sync with Star Wars API');
    }
  }
}
