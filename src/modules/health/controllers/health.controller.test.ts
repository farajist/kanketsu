jest.mock('ioredis');
import { testGet } from '../../../utils/tests';
import { IsAliveResp } from '../dtos/isalive-response.dto';

describe('/ (isalive)', () => {
  it('should return ok', async () => {
    const {
      body: { isAlive },
    }: { body: IsAliveResp } = await testGet('/health');
    expect(isAlive).toEqual(true);
  });
});
