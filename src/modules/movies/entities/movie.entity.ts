import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  episodeId: number;

  @Column({ type: 'text' })
  @ApiProperty()
  openingCrawl: string;

  @Column()
  @ApiProperty()
  director: string;

  @Column()
  @ApiProperty()
  producer: string;

  @Column()
  @ApiProperty()
  releaseDate: Date;

  @Column('longtext', { 
    nullable: true,
    transformer: {
      to: (value: string[]) => Array.isArray(value) ? JSON.stringify(value) : '[]',
      from: (value: string) => {
        try {
          return JSON.parse(value || '[]');
        } catch {
          return [];
        }
      }
    }
  })
  @ApiProperty()
  characters: string[];

  @Column('longtext', { 
    nullable: true,
    transformer: {
      to: (value: string[]) => Array.isArray(value) ? JSON.stringify(value) : '[]',
      from: (value: string) => {
        try {
          return JSON.parse(value || '[]');
        } catch {
          return [];
        }
      }
    }
  })
  @ApiProperty()
  planets: string[];

  @Column('longtext', { 
    nullable: true,
    transformer: {
      to: (value: string[]) => Array.isArray(value) ? JSON.stringify(value) : '[]',
      from: (value: string) => {
        try {
          return JSON.parse(value || '[]');
        } catch {
          return [];
        }
      }
    }
  })
  @ApiProperty()
  starships: string[];

  @Column('longtext', { 
    nullable: true,
    transformer: {
      to: (value: string[]) => Array.isArray(value) ? JSON.stringify(value) : '[]',
      from: (value: string) => {
        try {
          return JSON.parse(value || '[]');
        } catch {
          return [];
        }
      }
    }
  })
  @ApiProperty()
  vehicles: string[];

  @Column('longtext', { 
    nullable: true,
    transformer: {
      to: (value: string[]) => Array.isArray(value) ? JSON.stringify(value) : '[]',
      from: (value: string) => {
        try {
          return JSON.parse(value || '[]');
        } catch {
          return [];
        }
      }
    }
  })
  @ApiProperty()
  species: string[];

  @Column({ nullable: true })
  @ApiProperty()
  swApiUrl: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
