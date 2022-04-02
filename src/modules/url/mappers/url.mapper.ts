import Url from '../domain/url.domain';

export default class UrlMapper {
  static toRedisHash(longUrl: Url, hashDefaults: Omit<Url, 'url'>): any {
    return {
      startDate: longUrl.startDate || hashDefaults.startDate,
      endDate: longUrl.endDate || hashDefaults.endDate,
      ...longUrl
    };
  }

  static toDomain(raw: any): Url {
    const { start_date, end_date, url, hash, clicks } = raw;
    return {
      startDate: start_date,
      endDate: end_date,
      url,
      hash,
      clicks
    };
  }
}
