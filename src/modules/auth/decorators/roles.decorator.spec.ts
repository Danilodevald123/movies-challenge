import { Roles } from './roles.decorator';
import { UserRole } from '../../users/entities/user.entity';

describe('Roles Decorator', () => {
  it('should set metadata with roles', () => {
    // Create a dummy target
    class TestClass {
      @Roles(UserRole.ADMIN)
      testMethod() {}
    }

    // Get metadata
    const metadata = Reflect.getMetadata('roles', TestClass.prototype.testMethod);
    
    expect(metadata).toBeDefined();
    expect(metadata).toEqual([UserRole.ADMIN]);
  });

  it('should handle multiple roles', () => {
    class TestClass {
      @Roles(UserRole.ADMIN, UserRole.USER)
      testMethod() {}
    }

    const metadata = Reflect.getMetadata('roles', TestClass.prototype.testMethod);
    
    expect(metadata).toBeDefined();
    expect(metadata).toEqual([UserRole.ADMIN, UserRole.USER]);
  });
});
