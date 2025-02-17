import { BadRequestException } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';

export class MovieValidator {
  static validate(movieData: CreateMovieDto | UpdateMovieDto): void {
    MovieValidator.validateTitle(movieData.title);
    MovieValidator.validateEpisodeId(movieData.episodeId);
    MovieValidator.validateReleaseDate(movieData.releaseDate);
    MovieValidator.validateOpeningCrawl(movieData.openingCrawl);
    MovieValidator.validateDirector(movieData.director);
    MovieValidator.validateProducer(movieData.producer);
  }

  private static validateTitle(title?: string): void {
    if (title && (title.length < 3 || title.length > 100)) {
      throw new BadRequestException('Movie title must be between 3 and 100 characters');
    }
  }

  private static validateEpisodeId(episodeId?: number): void {
    if (episodeId !== undefined) {
      if (episodeId <= 0) {
        throw new BadRequestException('Episode ID must be greater than 0');
      }
      if (episodeId > 100) {
        throw new BadRequestException('Episode ID cannot be greater than 100');
      }
    }
  }

  private static validateReleaseDate(releaseDate?: Date): void {
    if (releaseDate) {
      const parsedDate = new Date(releaseDate);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('Invalid release date format');
      }
      
      const currentDate = new Date();
      if (parsedDate > currentDate) {
        throw new BadRequestException('Release date cannot be in the future');
      }
    }
  }

  private static validateOpeningCrawl(openingCrawl?: string): void {
    if (openingCrawl && (openingCrawl.length < 10 || openingCrawl.length > 1000)) {
      throw new BadRequestException('Opening crawl must be between 10 and 1000 characters');
    }
  }

  private static validateDirector(director?: string): void {
    if (director && director.length < 2) {
      throw new BadRequestException('Director name must be at least 2 characters long');
    }
  }

  private static validateProducer(producer?: string): void {
    if (producer && producer.length < 2) {
      throw new BadRequestException('Producer name must be at least 2 characters long');
    }
  }
}
