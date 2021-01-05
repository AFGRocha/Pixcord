chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes('artworks')) {
    chrome.tabs.sendMessage(tabId, 'pixiv artwork page');
  }
});

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.webhook) {
    const { data, webhook, type } = req;
    artShare(data, webhook, type).then(sendResponse);
    return true;
  }
});

async function artShare(data, webhook, type) {
  try {
    console.log('data: ', data);
    const artFile = await dataUrlToFile(
      data.art,
      `${data.profileName} - ${data.title}`
    );
    const iconFile = await dataUrlToFile(
      data.profileImg,
      `${data.profileName}`
    );

    const files = [artFile, iconFile];
    const urls = await upload(files);
    console.log('urls: ', urls);

    const name = await getLocalStorageValue('name');
    const discordImage = await getLocalStorageValue('discordImage');

    var params = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: name,
        avatar_url: discordImage,
        content: '',
        embeds: [
          {
            title: data.title,
            url: data.artUrl,
            color: 7506394,
            author: {
              name: data.profileName,
              url: data.profileLink,
              icon_url: urls[1]
            },
            footer: {
              text: 'Pixcord developed by @DaikiPT'
            },
            timestamp: new Date(),
            image: {
              url: urls[0]
            }
          }
        ]
      })
    };

    const res = await fetch(webhook, params);

    if (res.status === 204) {
      return { message: 'success', type };
    }
  } catch (error) {
    console.error({ error });
    return { message: 'error' };
  }
}

async function dataUrlToFile(dataUrl, fileName) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/jpeg' });
}

async function upload(files) {
  let formData = new FormData();
  return await Promise.all(
    files.map(async file => {
      formData.append('file', file);
      formData.append('upload_preset', 'pixcord');
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dxxvlmkqg/image/upload',
        { method: 'POST', body: formData }
      );
      const body = await res.text();
      return JSON.parse(body).url;
    })
  );
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
