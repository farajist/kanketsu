import { IUrl } from "./models/url";
import { UrlDTO } from "./models/url.dto";


export default class UrlMapper {
  static toRedisHash(longUrl: UrlDTO, hashDefaults?: Omit<IUrl, 'url'>) {
    return {
      startDate: longUrl.startDate || hashDefaults?.startDate,
      endDate: longUrl.endDate || hashDefaults?.endDate,
      ...longUrl,
    };
  }

  static toDomain(raw: any): IUrl {
    const { start_date, end_date, url, hash, clicks } = raw;
    return {
      startDate: start_date,
      endDate: end_date,
      url,
      hash,
      clicks,
    };
  }
}
