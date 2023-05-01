chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //Beta for the share button inside the page
  if (request === 'pixiv artwork page') {
    makeButtons();
  } else if (request.webhook) {
    sendData(request.webhook, request.type);
  }
});

function makeButtons() {
  if (!document.getElementById('PixcordSFW')) {
    // Empty like button or full like button
    const wrapper = (
      document.querySelector('.gtm-main-bookmark') ||
      document.querySelector('a[href^="/bookmark"]')
    ).parentElement.parentElement;
    //Creating containers
    let sfwDiv = document.createElement('div');
    let nsfwDiv = document.createElement('div');
    let negaDiv = document.createElement('div');
    sfwDiv.className = 'sc-181ts2x-3 cXSAgn';
    nsfwDiv.className = 'sc-181ts2x-3 cXSAgn';
    negaDiv.className = 'sc-181ts2x-3 cXSAgn';
  
    // Buttons
    let sfw = document.createElement('BUTTON');
    let nsfw = document.createElement('BUTTON');
    let nega = document.createElement('BUTTON');
    nsfwDiv.appendChild(nsfw);
    sfwDiv.appendChild(sfw);
    negaDiv.appendChild(nega)
    
    // Attributes
    sfw.setAttribute('id', 'PixcordSFW');
    nsfw.setAttribute('id', 'PixcordNSFW');
    nega.setAttribute("id", "PixcordNEGA")

    // Text
    let sfwText = document.createTextNode('Share to #art');
    let nsfwText = document.createTextNode('Share to #NSFW');
    let negaText = document.createTextNode('Share to AAAAA');
    sfw.appendChild(sfwText);
    nsfw.appendChild(nsfwText);
    nega.appendChild(negaText);

    // On Click
    sfw.onclick = function () {
      let button = document.getElementById('PixcordSFW');
      button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';
      sendData(
        'https://discord.com/api/webhooks/1007964692561539173/FsiPgYnmxdtxYaQkVTpo5966x8Sc6GCJ9cfUoa4OPnrTeya1wvITUSzuH7u8qJlHdtRz',
        'sfw'
      );
    };
    nsfw.onclick = function () {
      let button = document.getElementById('PixcordNSFW');
      button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';
      sendData(
        'https://discord.com/api/webhooks/1007964849168457748/DIJ6diBSJQlQiwbVYLLphqRAhlEaAPd9840E-7iqHsYUM0HkF-HUpSNuLV0QsvROtgFt',
        'nsfw'
      );
    };

    nega.onclick = function () {
      let button = document.getElementById('PixcordNEGA');
      button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';
      sendData(
        'https://discord.com/api/webhooks/835918455503978606/ixOZ3mP78Ph_akUrBz53WWKJ4bQ95xOcBKsJlTYGdgNYkZLSyZQ5YePylQDVQ0RCvWLn',
        'nega'
      );
    };

    // Append final result
    wrapper.appendChild(sfwDiv);
    wrapper.appendChild(nsfwDiv);
    wrapper.appendChild(negaDiv);
    
  }
}

function getArtInfo() {
  const artUrl = location.href;
  const profileLinks = document
    .querySelector('aside')
    .querySelectorAll('a[href^="/en/users/"]');
  const profileImg =
    profileLinks[0].querySelector('figure') ||
    profileLinks[0].querySelector('img');
  const profileName = profileLinks[1].innerText;

  const art = document.querySelector('main section figure img');

  const artDescription = document.querySelector('figcaption');
  const title =
    (artDescription.querySelector('h1') || artDescription.querySelector('p'))
      ?.innerText || 'Untitled';

  return {
    profileLink: profileLinks[0].href,
    profileImg,
    profileName,
    artUrl,
    art,
    title,
  };
}
const compressImage = async (url) => {
  try {
    if (!url) return Promise.resolve('');

    // const res = await fetch(url);
    // const blob = await res.blob();
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.crossOrigin="anonymous"
      image.src = 'https://cors-anywhere.herokuapp.com/' + url;

      image.onload = function () {
        let canvas = document.createElement('CANVAS');
        const ctx = canvas.getContext('2d');
        canvas.height = image.height;
        canvas.width = image.width;
        ctx.drawImage(image, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataURL);
      };
      image.onerror = () => reject('Failed to load image to compress');
    });
  } catch (error) {
    console.log(error.message);
  }
};

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

async function sendData(webhook, type) {
  let button = ''
  
  switch (type) {
    case 'sfw':
      button = document.getElementById('PixcordSFW')
      break;
    case 'nsfw':
      button = document.getElementById('PixcordNSFW')
      break;
    case 'nega':
      button = document.getElementById('PixcordNEGA')
      break;
  }

  button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';

  const { artUrl, profileLink, profileImg, profileName, art, title } =
    getArtInfo();

  try {
    art64 = await compressImage(art.src);
    profile64 = await compressImage(profileImg.src);

    chrome.runtime.sendMessage(
      {
        data: {
          artUrl,
          profileLink,
          profileImg: profile64,
          profileName,
          art: art64,
          title,
        },
        webhook,
        type,
      },
      function (res) {
        if (res.status === 'success') {
          button.innerHTML = '✔️Shared';
        } else {
          console.log('Error uploading to Pixcord:', res.message);
          button.innerHTML = '❌Error';
        }
      }
    );
  } catch (error) {
    console.error({ error });
  }
}
