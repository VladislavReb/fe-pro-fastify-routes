import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  const uppCase = request.body.toUpperCase();

  if (uppCase.includes('FUCK')) {
    return reply.status(403).send('unresolved');
  }
  return reply.send(uppCase);
});

fastify.post('/lowercase', (request, reply) => {
  const lowCase = request.body.toLowerCase();

  if (lowCase.includes('fuck')) {
    return reply.status(403).send('unresolved');
  }
  return reply.send(lowCase);
});

fastify.get('/user/:id', (request, reply) => {
  const {id} = request.params;

  if (!users[id]) {
    return reply.status(400).send('User not exist');
  }
  return reply.send(users[id]);
});

fastify.get('/users', (request, reply) => {
  const {filter, value} = request.query;
  if (!filter && !value) {
    return reply.send(Object.values(users));
  }
  return reply.send(Object.values(users).filter((user) => user[filter].toString() === value));
});

export default fastify;
