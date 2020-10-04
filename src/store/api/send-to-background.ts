declare const chrome: any;

export const sendToBackground = <T = any>(
  action: string,
  payload: any
): Promise<T> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action, payload }, function (
      result: T & { error?: string }
    ) {
      if (result.error) {
        return reject(result);
      }

      resolve(result);
    });
  });
