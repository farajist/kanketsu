import cache from '@common/cache/cache';
import UrlMapper from '../url.mapper';
import { randomIntBetween } from '../../../utils/random';
import { encode } from '../../../lib/base62';
import { UrlDTO } from '../models/url.dto';
import { UrlSaveOptions } from '../models/url-save-options';
import { IUrl } from '../models/url';


// const DEFAULT_URL_LIFE_TIME_KEY = 'url_lifetime'; // TODO: find a better name

interface IUrlCache {
  uniqId: () => Promise<string>;
  findUrl: (longUrl: string) => Promise<string | null>;
  findHash: (shortUrl: string) => Promise<Record<string, string>>
  click: (shortUrl: string) => Promise<void>
  set: (url: UrlDTO, options?: UrlSaveOptions) => Promise<{url: string, hash: string}>
  get: (hash: string) => Promise<IUrl>
}

const urlCache: IUrlCache = {
  uniqId: async function (): Promise<string> {
    const count = await cache.incr('counter');
    return encode(randomIntBetween(9999, 999999) + count);
  },
  findUrl: async function (longUrl: string): Promise<string | null> {
    return cache.get(longUrl);
  },
  findHash: async function (shortUrl: string): Promise<Record<string, string>> {
    return cache.hgetall(shortUrl);
  },
  click: async function (shortUrl: string): Promise<void> {
    await cache.hincrby(shortUrl, 'clicks', 1);
  },
  set: async function (data: UrlDTO, options: UrlSaveOptions = { overwrite: false }): Promise<{ url: string; hash: string; }> {
    const { url } = data;
    const { overwrite } = options;
    const hash = await this.findUrl(data.url);
    if (!overwrite && hash) return { hash, url: data.url };

    // FIXME: load and pass defaults
    const rawLongUrlData = UrlMapper.toRedisHash(data);

    const uid = await this.uniqId();
    await cache.multi().set(data.url, uid).hmset(uid, rawLongUrlData).exec();
    return { hash: uid, url };
  },
  get: async function (shortUrlHash: string): Promise<IUrl> {
    const payload = await this.findHash(shortUrlHash);
    if (Object.keys(payload).length === 0) {
      throw new Error('hash not found');
    }
    await this.click(shortUrlHash);
    return UrlMapper.toDomain(payload);
  }
}

export default urlCache;
