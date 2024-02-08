import { Document, model, Schema } from 'mongoose';

export interface IUrl {
  url: string;
  hash: string;
  clicks: number;
  startDate?: Date;
  endDate?: Date;
}

export type UrlDocument = IUrl & Document;

export const UrlSchema: Schema = new Schema<UrlDocument>({
  url: { type: String, required: true },
  hash: { type: String, required: true, index: true },
  clicks: { type: Number, required: true, default: 0 },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: Date },
});

export default model<UrlDocument>('urls', UrlSchema);
