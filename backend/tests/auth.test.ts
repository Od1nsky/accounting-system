import request from 'supertest';
import app from '../src/index';

describe('Auth API', () => {
  let token: string;
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  };

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);

    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('email', testUser.email);
    expect(response.body.user).toHaveProperty('name', testUser.name);
    token = response.body.token;
  });

  it('should not register duplicate user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(400);
  });

  it('should login existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('email', testUser.email);
  });

  it('should not login with wrong password', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      })
      .expect(401);
  });

  it('should get current user with valid token', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('email', testUser.email);
    expect(response.body).toHaveProperty('name', testUser.name);
  });

  it('should not get current user without token', async () => {
    await request(app)
      .get('/api/auth/me')
      .expect(401);
  });
});
