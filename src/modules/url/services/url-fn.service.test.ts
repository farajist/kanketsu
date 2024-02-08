jest.mock('ioredis');

const Redis = require('ioredis-mock');
const redis = new Redis({
  keyPrefix: 'shus-test:',
  data: {
    'https://example.com/your-own-destiny': 'UV5RkzXh',

    counter: 0,
    'https://test.shus/overwrite-this': 'RVu4FVLS',
    UV5RkzXh: {
      url: 'https://example.com/your-own-destiny',
      hash: 'UV5RkzXh',
    },
    RVu4FVLS: {
      url: 'https://test.shus/overwrite-this',
      hash: 'RVu4FVLS',
      start_date: new Date(),
      end_date: new Date(+new Date() + 86400000),
      clicks: 0,
    },
  },
});

jest.doMock('@common/cache', () => {
  const originalModule = jest.requireActual('@common/cache');

  return {
    __esModule: true, 
    ...originalModule,
    default: redis
  }
});

import urlService from './url.service';

describe('url-fn.service', () => {

  it('should find stored url', async () => {
    const hash = await urlService.findUrl(
      'https://example.com/your-own-destiny'
    );
    expect(hash).toEqual('UV5RkzXh');
  });

  it('should return null when no hash is found', async () => {
    const nullHash = await urlService.findUrl('https://404.yeah');
    expect(nullHash).toBeNull();
  });

  it('should generate a unique ID and update count', async () => {
    const currCount = parseInt(await redis.get('counter'), 10);
    const uid = await urlService.uniqId();
    const incrCount = parseInt(await redis.get('counter'), 10);

    expect(uid).toEqual(expect.stringMatching(/^[A-HJ-NP-Za-km-z1-9]*$/));
    expect(incrCount).toEqual(currCount + 1);
  });

  it('should correctly save a new url', async () => {
    const newLongUrl = 'https://example.com/what-to-set';
    const payload = await urlService.set({
      url: newLongUrl,
      startDate: new Date(),
      endDate: new Date(+new Date() + 86400000),
    });

    const newHash = await redis.get(newLongUrl);
    const hashMeta = await redis.hgetall(newHash);

    expect(payload.hash).toEqual(newHash);

    expect(payload.url).toEqual(newLongUrl);
    expect(newLongUrl).toEqual(hashMeta.url);
  });

  it('should overwrite a previously stored url when option is set', async () => {
    const existingLongUrl = 'https://test.shus/overwrite-this';
    await urlService.set(
      {
        url: existingLongUrl,
      },
      { overwrite: true }
    );

    const newHash = await redis.get(existingLongUrl);
    expect(newHash).not.toEqual('RVu4FVLS');
  });

  it('should get longUrl with meta from short version', async () => {
    const longUrlWithMeta = await urlService.get('UV5RkzXh');

    expect(longUrlWithMeta).toEqual(
      expect.objectContaining({
        url: 'https://example.com/your-own-destiny',
        hash: 'UV5RkzXh',
      })
    );
  });

  it('should throw on non-existing shortUrl hash', async () => {
    await expect(urlService.get('f4fOf4')).rejects.toThrowError(
      /hash not found/
    );
  });

  it('should incr click counter when get is called', async () => {
    const hashCode = 'UV5RkzXh';
    const currClickCount = parseInt(await redis.hget(hashCode, 'clicks'), 10);
    await urlService.get(hashCode);

    await expect(redis.hget(hashCode, 'clicks')).resolves.toEqual(
      String(currClickCount + 1)
    );
  });
});
