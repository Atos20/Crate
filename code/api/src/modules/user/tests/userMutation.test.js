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
       );
   });

   it('can create a user', async () => {
     const response = await request(server)
     .post('/graphql')
     .send({ query: 'mutation { userSignup(email: "stubz@crate.com", name: "Stubz", password: "itsasecret") { id name email } }'})
     .expect(200)

      expect(response.body.data.userSignup.name).toEqual('Stubz');
      expect(response.body.data.userSignup.email).toEqual('stubz@crate.com');
    });

    it('can update a user', async () => {
      const response = await request(server)
        .post('/graphql')
        .send({ query: 'mutation { userUpdate(id: 1, survey: true, style: "athletic") { name survey style } }' })
        .expect(200)

    });
 });
