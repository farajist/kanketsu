import RedisClient, { Cluster, Redis, RedisOptions } from 'ioredis';
import env, { Env } from '../../environment/env';

export type CacheClient = Redis; // union other possible types

export function redisEnvOptions(env: Env): RedisOptions {
  const { redisHost, redisPort, redisDb, redisPassword } = env;
  return {
    host: redisHost,
    port: redisPort,
    db: redisDb,
    password: redisPassword,
  };
}

function createCacheClient(): CacheClient {
  return new RedisClient(redisEnvOptions(env));
}

const cache = createCacheClient();

export const createClient = (
  type: 'client' | 'subscriber' | 'bclient'
): Redis | Cluster => {
  switch (type) {
    case 'client':
      return cache;
    case 'subscriber':
      return cache;
    default:
      return new RedisClient(redisEnvOptions(env));
  }
};

export default cache;
