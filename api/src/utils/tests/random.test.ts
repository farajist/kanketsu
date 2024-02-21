import { randomIntBetween } from '../random';

describe('utils.random', () => {
  it('should generate a random between [min, max]', () => {
    const [min, max] = [10, 20];
    const num = randomIntBetween(min, max);
    expect(num).toBeLessThanOrEqual(max);
    expect(num).toBeGreaterThanOrEqual(min);
  });
});
