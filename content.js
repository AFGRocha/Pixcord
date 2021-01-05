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
    //Creating the first div
    let divSFW = document.createElement('div');
    divSFW.className = 'sc-181ts2x-3 iujCSd';

    //SFW Button
    let sfw = document.createElement('BUTTON'); // Create a <button> node
    sfw.setAttribute('id', 'PixcordSFW');
    sfw.onclick = function () {
      let button = document.getElementById('PixcordSFW');
      button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';
      sendData(
        'https://discordapp.com/api/webhooks/547508568849383426/3ceqXPSXNmnEHikyR65GL0UHTJoASHZWeu49Re5IhBYszSjMwDv8hfspWFso_SoQ4SBI',
        'sfw'
      );
    };
    let t = document.createTextNode('Share to #art'); // Create a text node
    sfw.appendChild(t); // Append the text to <p>
    divSFW.appendChild(sfw);
    document
      .getElementsByClassName('sc-181ts2x-0 jPZrYy')[0]
      .appendChild(divSFW); // Append to <div>

    //Second div
    let divNSFW = document.createElement('div');
    divNSFW.className = 'sc-181ts2x-3 iujCSd';

    //NSFW Button
    let nsfw = document.createElement('BUTTON'); // Create a <button> node
    nsfw.setAttribute('id', 'PixcordNSFW');
    nsfw.onclick = function () {
      let button = document.getElementById('PixcordNSFW');
      button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';
      sendData(
        'https://discordapp.com/api/webhooks/738107690672324639/GQeX-g04uhrHrLbxM4qV2E1ePRbUeXZd9xwX7lJCVcJDtrY-Bs3pSA15mm2cjoewQjxb',
        'nsfw'
      );
    };
    let t2 = document.createTextNode('Share to #NSFW'); // Create a text node
    nsfw.appendChild(t2); // Append the text to <p>
    divNSFW.appendChild(nsfw);
    document
      .getElementsByClassName('sc-181ts2x-0 jPZrYy')[0]
      .appendChild(divNSFW); // Append to <div>
  }
}

function getArtInfo() {
  // let firstStep = document
  //   .getElementsByClassName('sc-1asno00-0 iyBsWP')[0]
  //   .innerHTML.replace('<img src="', '');
  // let profileImg = firstStep.replace(
  //   '" width="40" height="40" alt="' +
  //     document.getElementsByClassName('sc-fzozJi daCWkW')[0].innerText +
  //     '" style="object-fit: cover; object-position: center top;">',
  //   ''
  // );
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
  const title = artDescription.querySelector('h1').innerText || 'Untitled';

  return {
    profileLink: profileLinks[0].href,
    profileImg,
    profileName,
    artUrl,
    art,
    title
  };
}
const compressImage = async url => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = URL.createObjectURL(blob);

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
};

const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

async function sendData(webhook, type) {
  let button =
    type === 'sfw'
      ? document.getElementById('PixcordSFW')
      : document.getElementById('PixcordNSFW');
  button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';

  const {
    artUrl,
    profileLink,
    profileImg,
    profileName,
    art,
    title
  } = getArtInfo();

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
          title
        },
        webhook,
        type
      },
      function (res) {
        const button =
          res.type === 'sfw'
            ? document.querySelector('#PixcordSFW')
            : document.querySelector('#PixcordNSFW');
        if (res.message === 'success') {
          button.innerHTML = '✔️Shared';
        } else {
          button.innerHtml = '❌Error';
        }
      }
    );
  } catch (error) {
    console.error({ error });
  }
}
