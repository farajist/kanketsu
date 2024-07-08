const ALPHA_NUM =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const BASE = ALPHA_NUM.length;

export function encode(counter: number): string {
  let encoded = '';
  while (counter) {
    const remainder = counter % BASE;
    counter = Math.floor(counter / BASE);
    encoded = ALPHA_NUM[remainder].toString() + encoded;
  }
  return encoded;
}
