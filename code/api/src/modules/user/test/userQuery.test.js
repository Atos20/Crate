import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('User Queries', () => {
  let server;
  beforeAll(() => {
    server = express();
    server.use(
      "/",
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  })
  it('returns all users', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({ query: '{users {email}}' })
      .expect(200)
    expect(response.body.data.users.length).toBe(2);
    done();
  });
  it('returns a user based on id', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({ query: '{user(id:1) {email name role createdAt}}' })
      .expect(200)
    expect(response.body).toMatchObject({
      data: {
        user: {
          email: 'admin@crate.com',
          name: 'The Admin',
          role: 'ADMIN',
          createdAt: '1607461482838'
        }
      }
    })
    done();
  });

  it('updates a users style and survey', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({ query: 'mutation { userUpdate(id: 1, style: "Athletic", survey: true) { id style survey } }' })
      .expect(200)

    expect(response.body.data.userUpdate.style).toEqual('Athletic');
    done();
  })  
})