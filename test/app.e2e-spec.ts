import * as supertest from 'supertest';

const baseURL = 'http://localhost:3000'; // Replace with your external server URL

const request = supertest(baseURL);

describe('Song API', () => {
  let songId: number;

  beforeAll(async () => {
    // This runs before any test cases in this describe block
    // You can initialize anything required here
  });

  afterAll(async () => {
    // This runs after all test cases in this describe block have finished
    // You can perform cleanup operations here
  });

  beforeEach(async () => {
    // This runs before each test case
    // You can use it to set up the environment or reset any state
    // For example, creating a new song before each test
    const res = await request.post('/songs').send({
      title: 'Kiss',
      artists: ['Kiss!', 'AC- DC!'],
      realisedDate: '2022-09-29',
      duration: '03:24',
      lirics: 'lala', // Typo: should be 'lyrics'
    });

    expect(res.status).toBe(201);
    songId = res.body.id;
  });

  afterEach(async () => {
    // This runs after each test case
    // You can use it to clean up or reset any state
    // For example, deleting the created song after each test
    const res = await request.delete(`/songs/${songId}`);
    expect(res.status).toBe(200);
  });

  test('Get all songs', async () => {
    const res = await request.get('/songs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Get the created song by ID', async () => {
    const res = await request.get(`/songs/${songId}`);
    expect(res.status).toBe(200);
    // Add more assertions as needed
  });

  test('Update the song using the captured ID', async () => {
    const res = await request.patch(`/songs/${songId}`).send({
      title: 'Kiss!2',
      artists: ['Kiss!', 'AC- DC!'],
      realisedDate: '2024-01-22',
    });

    expect(res.status).toBe(200);
    // Add more assertions as needed
  });

  // Other test cases...
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
