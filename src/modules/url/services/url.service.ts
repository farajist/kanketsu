import { Redis } from 'ioredis';
import UrlMapper from '../mappers/url.mapper';
import { randomIntBetween } from '../../../utils/random';
import { encode } from '../../../lib/base58';
import { UrlDTO } from '../dtos/url.dto';
import Url from '../domain/url.domain';

// const DEFAULT_URL_LIFE_TIME_KEY = 'url_lifetime'; // TODO: find a better name

interface UrlSaveOptions {
  overwrite?: boolean;
}

class UrlService {
  private db: Redis;

  constructor(db: Redis) {
    this.db = db;
  }

  async uniqId() {
    const count = await this.db.incr('counter');
    return encode(randomIntBetween(9999, 999999) + count);
  }

  async findUrl(longUrl: string) {
    return this.db.get(longUrl);
  }

  findHash(shortUrl: string) {
    return this.db.hgetall(shortUrl);
  }

  async click(shortUrl: string) {
    this.db.hincrby(shortUrl, 'clicks', 1);
  }

  async set(data: UrlDTO, options: UrlSaveOptions = { overwrite: false }) {
    const { url } = data;
    const { overwrite } = options;
    const hash = await this.findUrl(url);
    if (!overwrite && hash) return { hash, url };

    // FIXME: load and pass defaults
    const rawLongUrlData = UrlMapper.toRedisHash(data, {});

    const uid = await this.uniqId();
    await this.db.multi().set(url, uid).hmset(uid, rawLongUrlData).exec();
    return { hash: uid, url };
  }

  async get(shortUrlHash: string): Promise<Url> {
    const payload = await this.findHash(shortUrlHash);
    if (Object.keys(payload).length === 0) {
      throw new Error('hash not found');
    }
    await this.click(shortUrlHash);
    return UrlMapper.toDomain(payload);
  }
}

const urlService = new UrlService({});
export default urlService;
