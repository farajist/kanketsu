const RETRY_DELAY = 1000;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const executeAsyncWithRetry = async (
  asyncFunc: Function
): Promise<any> => {
  try {
    return asyncFunc();
  } catch (e) {
    await sleep(RETRY_DELAY);
    return executeAsyncWithRetry(asyncFunc);
  }
};
