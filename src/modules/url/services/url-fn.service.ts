import cache from '@common/cache';
import { tokenGenerator } from '@common/token';
import { encode } from '@lib/base62';

import { UrlDTO } from '../interfaces/url.dto';
import Url from '../models/url.model';

async function fetchHash(url: string): Promise<string | null> {
  const hashInCache = await cache.exists(url);
  if (hashInCache) return cache.get(url);
  const urlDoc = await Url.findOne({ url });
  if (urlDoc) {
    await cache.set(url, urlDoc.hash);
    return urlDoc.hash;
  }
  return null;
}

async function shorten(data: UrlDTO) {
  const { url } = data;
  const hash = await fetchHash(url);
  if (hash) return { hash, url };
  const { value: seed } = await tokenGenerator.next();
  if (!seed) throw new Error('invalid token');
  const newHash = encode(seed);
  Url.create({ hash: newHash, url, startDate: '', endDate: '', clicks: 0 });
  await cache.set(url, newHash);
  return { url, hash: newHash };
}

async function expand(hash: string) {
  const url = await Url.findOne({ hash });
  if (!url) throw new Error('url not found');
  return { hash, startDate: '', endDate: '', url: '', clicks: '' };
}

export default {
  shorten,
  expand,
};
