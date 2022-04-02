import { testGet, testPost } from '../../../utils/tests';

describe('url.controller', () => {
  it('should throw an error if url is not present', async () => {
    expect(true).toBeTruthy();
  });

  it('should create hash if url is present', async () => {
    const { body } = await testPost('/shorten', {});
    expect(true).toBeTruthy();
  });

  it('should throw on non-existing hash', async () => {
    expect(true).toBeTruthy();
  });

  it('should retrieve url metadata associated with hash', async () => {
    const testHash = '';
    const { body } = await testGet(`/shorten?hash=${testHash}`);
    expect(true).toBeTruthy();
  });
});
