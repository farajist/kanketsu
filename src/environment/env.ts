import { config } from 'dotenv';

// load env vars from OS and .env file
config();

interface Env {
    cors: boolean;
    port: string;
}
// default env vars, should be non-sensitive
const env: Env = {
  cors: process.env.CORS === 'true' || false,
  port: process.env.PORT || '4000',
};

const requiredVars: (keyof Env)[] = [];

// guard against missing variables
const missingVars = requiredVars.filter((key: keyof Env) => !env[key]);
if (missingVars.length) {
  throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
}

export default env;
