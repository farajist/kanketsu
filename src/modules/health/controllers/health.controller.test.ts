import { testGet } from '../../../utils/tests';
import { IsAliveResp } from '../dtos/isalive-response.dto';

describe('/ (isalive)', () => {
  it('should return ok', async () => {
    const {
      body: { isAlive }
    }: { body: IsAliveResp } = await testGet('/');
    expect(isAlive).toEqual(true);
  });
});
