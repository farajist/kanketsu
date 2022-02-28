import { IsAliveResp } from './isalive.route';
import { testGet } from '../../utils/tests';

describe('/ (isalive)', () => {
  it('should return ok', async () => {
    const { body: { isAlive } } : {body: IsAliveResp} = await testGet('/');
    expect(isAlive).toEqual(true);
  });
});
