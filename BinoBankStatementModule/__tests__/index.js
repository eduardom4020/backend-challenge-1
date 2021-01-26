//importa os módulos e aqruivos necessários
import request from 'supertest';
import server from '~/'
import sayTDD from './helloJest';

beforeAll(async () => {
   console.log('Iniciando TDD!');
});

afterAll(() => {
   server.close();
   console.log('servidor fechado');
});


describe('inicio dos testes', () => {
   test('inicializa a api ', async () => {
      const response = await request(server).get('/');
      expect(response.status).toEqual(200);

   });
});