import { User } from '@src/models/user';
import AuthService from  '@src/services/auth';

describe('Users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });
  describe('When creating a new user', () => {
    it('should succesfully create a new user with encrypted password', async () => {
      const createUser = {
        name: 'John Doe',
        email: 'jhon@doe.com.br',
        password: '1234',
      };

      const response = await global.testRequest.post('/users').send(createUser);
      expect(response.status).toBe(201);
      expect(
        AuthService.comparePasswords(createUser.password, response.body.password)
      ).resolves.toBeTruthy();
      expect(response.body).toEqual(
        expect.objectContaining({
          ...createUser,
          ...{ password: expect.any(String) },
        })
      );
    });

    it('should return 422 when there is a validation error', async () => {
      const createUser = {
        email: 'jhon@doe.com.br',
        password: '1234',
      };

      const response = await global.testRequest.post('/users').send(createUser);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'User validation failed: name: Path `name` is required.',
      });
    });

    it('should return 409 when email already exists', async () => {
      const createUser = {
        name: 'John Doe',
        email: 'jhon@doe.com.br',
        password: '1234',
      };
      await global.testRequest.post('/users').send(createUser);
      const response = await global.testRequest.post('/users').send(createUser);
      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error: 'User validation failed: email: already exists in the database.',
      });
    });
  });
});
