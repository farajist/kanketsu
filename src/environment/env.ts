import { config } from 'dotenv';

// load env vars from OS and .env file
config();

interface Env {
  cors: boolean;
  port: string;

  redisHost: string;
  redisPassword: string;
  redisPort: number;
  redisDb: number;
}
// default env vars, should be non-sensitive
const env: Env = {
  cors: process.env.CORS === 'true' || false,
  port: process.env.PORT || '4000',

  // redis
  redisHost: process.env.REDIS_HOST || '',
  redisPassword: process.env.REDIS_PASSWORD || '',
  redisPort: parseInt(process.env.REDIS_PORT || '6379'),
  redisDb: parseInt(process.env.REDIS_DB || '0'),
};

const requiredVars: (keyof Env)[] = [];

// guard against missing variables
const missingVars = requiredVars.filter((key: keyof Env) => !env[key]);
if (missingVars.length) {
  throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
}

export default env;
