import RedisClient, { Cluster, Redis, RedisOptions } from 'ioredis';
import env from '../../environment/env';

export type CacheClient = Redis; // union other possible types

export function redisEnvOptions(): RedisOptions {
  const { redisHost, redisPort, redisDb, redisPassword } = env;
  return {
    host: redisHost,
    port: redisPort,
    db: redisDb,
    password: redisPassword,
  };
}
function createCacheClient(): CacheClient {
  return new RedisClient(redisEnvOptions());
}

const cacheClient: CacheClient = createCacheClient();

export const createClient = (
  type: 'client' | 'subscriber' | 'bclient'
): Redis | Cluster => {
  switch (type) {
    case 'client':
      return cacheClient;
    case 'subscriber':
      return cacheClient;
    default:
      return new RedisClient(redisEnvOptions());
  }
};

export default cacheClient;
