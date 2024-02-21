/* eslint-disable no-console */
import { createServer } from 'http';
import initApp from './app';
import env from './env';

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

const app = initApp();
const port = normalizePort(env.port);
app.set('port', port);
const server = createServer(app);

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACESS':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit();
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  let bind: string;
  if (addr && typeof addr === 'object') {
    bind = `http://${addr.address.replace('::', 'localhost')}:${addr.port}`;
  } else {
    bind = `pipe ${addr}`;
  }
  console.log(`Listening on ${bind} in ${app.get('env')} mode`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
