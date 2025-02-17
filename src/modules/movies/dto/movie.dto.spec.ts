import { validate } from 'class-validator';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

describe('Movie DTOs', () => {
  describe('CreateMovieDto', () => {
    it('should validate a valid movie dto', async () => {
      const dto = new CreateMovieDto();
      dto.title = 'Test Movie';
      dto.episodeId = 1;
      dto.openingCrawl = 'Test Opening Crawl';
      dto.director = 'Test Director';
      dto.producer = 'Test Producer';
      dto.releaseDate = new Date();

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with invalid title', async () => {
      const dto = new CreateMovieDto();
      dto.episodeId = 1;
      dto.openingCrawl = 'Test Opening Crawl';
      dto.director = 'Test Director';
      dto.producer = 'Test Producer';
      dto.releaseDate = new Date();

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const titleError = errors.find(error => error.property === 'title');
      expect(titleError).toBeDefined();
    });

    it('should fail with invalid episode id', async () => {
      const dto = new CreateMovieDto();
      dto.title = 'Test Movie';
      dto.openingCrawl = 'Test Opening Crawl';
      dto.director = 'Test Director';
      dto.producer = 'Test Producer';
      dto.releaseDate = new Date();
      dto.episodeId = -1; // Número negativo no válido

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const episodeError = errors.find(error => error.property === 'episodeId');
      expect(episodeError).toBeDefined();
    });

    it('should fail with invalid release date', async () => {
      const dto = new CreateMovieDto();
      dto.title = 'Test Movie';
      dto.episodeId = 1;
      dto.openingCrawl = 'Test Opening Crawl';
      dto.director = 'Test Director';
      dto.producer = 'Test Producer';
      dto.releaseDate = 'invalid date' as any;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const dateError = errors.find(error => error.property === 'releaseDate');
      expect(dateError).toBeDefined();
    });

    it('should allow optional arrays to be undefined', async () => {
      const dto = new CreateMovieDto();
      dto.title = 'Test Movie';
      dto.episodeId = 1;
      dto.openingCrawl = 'Test Opening Crawl';
      dto.director = 'Test Director';
      dto.producer = 'Test Producer';
      dto.releaseDate = new Date();

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('UpdateMovieDto', () => {
    it('should validate when all fields are optional', async () => {
      const dto = new UpdateMovieDto();
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should validate with valid partial data', async () => {
      const dto = new UpdateMovieDto();
      dto.title = 'Updated Title';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with invalid data', async () => {
      const dto = new UpdateMovieDto();
      dto.episodeId = -1; // Número negativo no válido

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const episodeError = errors.find(error => error.property === 'episodeId');
      expect(episodeError).toBeDefined();
    });
  });
});
