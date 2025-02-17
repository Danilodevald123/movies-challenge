import { validate } from 'class-validator';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserRole } from '../entities/user.entity';

describe('User DTOs', () => {
  describe('CreateUserDto', () => {
    it('should validate a valid user dto', async () => {
      const dto = new CreateUserDto();
      dto.email = 'test@example.com';
      dto.password = 'StrongPass123!';
      dto.role = UserRole.USER;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with invalid email', async () => {
      const dto = new CreateUserDto();
      dto.email = 'invalid-email';
      dto.password = 'StrongPass123!';
      dto.role = UserRole.USER;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const emailError = errors.find(error => error.property === 'email');
      expect(emailError).toBeDefined();
    });

    it('should fail with weak password', async () => {
      const dto = new CreateUserDto();
      dto.email = 'test@example.com';
      dto.password = '123'; // Contraseña muy corta
      dto.role = UserRole.USER;

      const errors = await validate(dto, { validationError: { target: false } });
      expect(errors.length).toBeGreaterThan(0);
      const passwordError = errors.find(error => error.property === 'password');
      expect(passwordError).toBeDefined();
    });

    it('should fail with invalid role', async () => {
      const dto = new CreateUserDto();
      dto.email = 'test@example.com';
      dto.password = 'StrongPass123!';
      dto.role = 'invalid_role' as UserRole;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const roleError = errors.find(error => error.property === 'role');
      expect(roleError).toBeDefined();
    });
  });

  describe('UpdateUserDto', () => {
    it('should validate when all fields are optional', async () => {
      const dto = new UpdateUserDto();
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should validate with valid partial data', async () => {
      const dto = new UpdateUserDto();
      dto.email = 'test@example.com';

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with invalid email in partial update', async () => {
      const dto = new UpdateUserDto();
      dto.email = 'invalid-email';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const emailError = errors.find(error => error.property === 'email');
      expect(emailError).toBeDefined();
    });
  });
});
