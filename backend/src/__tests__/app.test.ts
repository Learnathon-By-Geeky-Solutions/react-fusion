import request from 'supertest';
import app from '../app';

describe('Health Check Endpoint', () => {
  it('should return 200 and correct message', async () => {
    const response = await request(app).get('/test');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Server working....!'
    });
  });

  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: '/non-existent-route',
          message: 'API Not Found'
        }
      ]
    });
  });
}); 