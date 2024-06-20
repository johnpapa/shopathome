const fastify = require('fastify')();
const cors = require('@fastify/cors');
const helmet = require('@fastify/helmet');

fastify.register(helmet);
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
});

const routes = require('./routes');
const options = {
  prefix: '/api',
  logger: true,
};
fastify.register(routes, options);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server started on port 3000');
  } catch (err) {
    fastify.log.error(err);
    console.error(err);
    process.exit(1);
  }
};

start();
