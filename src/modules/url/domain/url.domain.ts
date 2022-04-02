export default class Url {
  url: string;

  hash?: string;

  startDate?: Date;

  endDate?: Date;

  clicks?: number;

  constructor(url: string, startDate?: Date, endDate?: Date, clicks?: number) {
    this.url = url;
    this.startDate = startDate;
    this.endDate = endDate;
    this.clicks = clicks;
  }
}
