import { User } from '@src/models/user';

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
        error: "Unprocessable Entity",
        message: 'User validation failed: name: Path `name` is required.',
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
        error: "Conflict",
        message: 'User validation failed: email: already exists in the database.',
      });
    });
  });

  describe("When authenticating a user", () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
      };
      await new User(newUser).save();
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: newUser.email, password: newUser.password });
      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });
    it('Should return UNAUTHORIZED if the user with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: 'some-email@mail.com', password: '1234' });

      expect(response.status).toBe(401);
    });

    it('Should return ANAUTHORIZED if the user is found but the password does not match', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
      };
      await new User(newUser).save();
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({ email: newUser.email, password: 'different password' });

      expect(response.status).toBe(401);
    });
  })
});
