const ALPHA_NUM = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

const BASE = ALPHA_NUM.length;

function encode(num: number) {
  let encoded = '';
  while (num) {
    const remainder = num % BASE;
    num = Math.floor(num / BASE);
    encoded = ALPHA_NUM[remainder].toString() + encoded;
  }
  return encoded;
}

function decode(str: string) {
  let decoded = 0;
  while (str) {
    const index = ALPHA_NUM.indexOf(str[0]);
    const power = str.length - 1;
    decoded += index * BASE ** power;
    str = str.substring(1);
  }
  return decoded;
}

export { encode, decode };
