/* eslint-disable import/no-extraneous-dependencies */
import { Express } from 'express';
import superTest from 'supertest';
import { SuperTest, Test } from 'supertest';
import initApp from '../app';

export const testApp: Express = initApp(true);
export const request: SuperTest<Test> = superTest(testApp);

export interface RequestOptions {
  status?: number;
  headers?: { [key: string]: string };
}
const defaultOptions = { status: 200 };

export function testGet(
  url: string,
  options: RequestOptions = defaultOptions
): Test {
  const opt = { ...defaultOptions, ...options };
  let req = request.get(url);
  if (opt.headers) {
    req = req.set(opt.headers);
  }
  return req.expect('Content-Type', /json/).expect(opt.status);
}

export function testPost<T>(
  url: string,
  body: T,
  options: RequestOptions = defaultOptions
): Test {
  const opt = { ...defaultOptions, ...options };
  let req = request.post(url);
  if (opt.headers) {
    req = req.set(opt.headers);
  }
  return req
    .send(body as any)
    .expect('Content-Type', /json/)
    .expect(opt.status);
}
