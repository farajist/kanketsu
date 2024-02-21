import { Schema, model } from 'mongoose';
import { IUrl } from '../models/url';

const urlSchema = new Schema<IUrl>({
    url: { type: String, required: true },
    hash: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    clicks: { type: Number, default: 0 }
});

export const Url = model<IUrl>('Url', urlSchema);