import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Episode ID must be a number' })
  @Min(1, { message: 'Episode ID must be greater than 0' })
  episodeId: number;

  @ApiProperty()
  @IsString({ message: 'Opening crawl must be a string' })
  openingCrawl: string;

  @ApiProperty()
  @IsString({ message: 'Director must be a string' })
  director: string;

  @ApiProperty()
  @IsString({ message: 'Producer must be a string' })
  producer: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Release date must be a date' })
  releaseDate: Date;

  @ApiProperty({ type: [String] })
  @IsArray({ message: 'Characters must be an array' })
  @IsOptional()
  @IsString({ each: true, message: 'Each character must be a string' })
  characters?: string[];

  @ApiProperty({ type: [String] })
  @IsArray({ message: 'Planets must be an array' })
  @IsOptional()
  @IsString({ each: true, message: 'Each planet must be a string' })
  planets?: string[];

  @ApiProperty({ type: [String] })
  @IsArray({ message: 'Starships must be an array' })
  @IsOptional()
  @IsString({ each: true, message: 'Each starship must be a string' })
  starships?: string[];

  @ApiProperty({ type: [String] })
  @IsArray({ message: 'Vehicles must be an array' })
  @IsOptional()
  @IsString({ each: true, message: 'Each vehicle must be a string' })
  vehicles?: string[];

  @ApiProperty({ type: [String] })
  @IsArray({ message: 'Species must be an array' })
  @IsOptional()
  @IsString({ each: true, message: 'Each species must be a string' })
  species?: string[];
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
