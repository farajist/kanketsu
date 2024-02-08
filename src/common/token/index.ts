import { Buffer } from 'buffer';
import ZooKeeper from 'zookeeper';
import { END_OFFSET, PATH, START_OFFSET } from './constants';

interface Token {
  start: number;
  end: number;
  current: number;
}

let token: Token = { start: 0, current: 0, end: 0 };

function offsetExists(): Promise<boolean> {
  return tokenClient.pathExists(PATH, false);
}

async function setOffsetValue(value: number): Promise<void> {
  await tokenClient.set(PATH, Buffer.from(String(value), 'utf-8'), -1);
}

async function createOffset(): Promise<void> {
  tokenClient.create(
    PATH,
    Buffer.from('0', 'utf-8'),
    ZooKeeper.constants.ZOO_PERSISTENT
  );
}

async function fetchTokenValue(): Promise<Token> {
  // fetch from cache
  if (token.current < token.end && token.current != 0) {
    return token;
  }
  // const offExists = await offsetExists();
  // if (!offExists) return null;

  const [, data] = await tokenClient.get(PATH, false);
  const offsetValue = parseInt(data.toString());

  token = {
    start: offsetValue + START_OFFSET,
    end: offsetValue + END_OFFSET,
    current: offsetValue + START_OFFSET,
  };
  await setOffsetValue(token.start);
  return token;
}

// async function removeToken(): Promise<void> {
//   try {
//     tokenClient.delete_(PATH, -1);
//   } catch (error) {
//     console.log('error removing token');
//   }
// }

async function* TokenGenerator() {
  const token = await fetchTokenValue();
  while (true) {
    if (!token) break;
    yield token.current;
    token.current++;
    if (token.current >= token.end) break;
  }
}
async function createOffsetIfNotExists(): Promise<void> {
  const offExists = await offsetExists();
  if (!offExists) {
    await createOffset();
  }
}

async function initializeOffset(): Promise<void> {
  setOffsetValue(0);
}

export function createTokenClient() {
  const tc = new ZooKeeper({
    connect: '127.0.0.1:2181',
    timeout: 5000,
    debug_level: ZooKeeper.constants.ZOO_LOG_LEVEL_INFO,
    host_order_deterministic: false,
  });

  tc.on('connect', async () => {
    await createOffsetIfNotExists();
    await initializeOffset();
  });
  return tc;
}

// const tokenGenerator = tokenGenerator();
// tokenGenerator
//   .next()
//   .then((val) => console.log(val))
//   .then(() => tokenGenerator.next().then((val) => console.log(val)));

export const tokenClient = createTokenClient();
export const tokenGenerator = TokenGenerator();
