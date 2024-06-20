const api = 'http://localhost:7071/api';
const production = process.env.NODE_ENV === 'production';
const API = import.meta.env.VITE_API
  ? import.meta.env.VITE_API
  : production
    ? '/api'
    : api;
const FASTIFY = import.meta.env.VITE_FASTIFY === 'true' ? true : false;
const DEV: boolean = import.meta.env.DEV || true;

function logEnvironment() {
  console.log('API:', API);
  console.log('DEV:', DEV);
  console.log('FASTIFY:', FASTIFY);
}

logEnvironment();

export { API, DEV, FASTIFY, logEnvironment };
