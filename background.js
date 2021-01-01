chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
async function dataUrlToFile(dataUrl, fileName) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/jpeg' });
}
async function getLocalStorageValue(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function (value) {
        if (!value[key]) {
          if (key === 'name') {
            resolve('Pixcord');
          } else if (key === 'discordImage')
            resolve('https://i.imgur.com/VQFaBcn.png');
        }
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}
