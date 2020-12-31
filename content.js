chrome.runtime.onMessage.addListener(function (res) {
  //Beta for the share button inside the page
  function artShare(webhook, type) {
    let button;
    if (type) {
      button =
        type === 'sfw'
          ? document.getElementById('PixcordSFW')
          : document.getElementById('PixcordNSFW');
      button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';
    }

    var request = new XMLHttpRequest();
    request.open('POST', webhook);

    var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();

    //Art upload settings
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');

    var dataFields = new FormData();

    var imgSrc = document
      .querySelector('.gtm-expand-full-size-illust')
      .querySelector('img').src;

    // Other methods of getting image source in case something breaks
    // document.querySelectorAll('[role="presentation"]')[2]?.querySelector('img').src
    //document.getElementsByClassName('sc-1qpw8k9-1 fvHoJ')[0].src;

    dataFields.append('image', imgSrc);
    dataFields.append('type', 'URL');
    xhr.send(dataFields);

    //Profile picture upload settings
    xhr2.open('POST', 'https://api.imgur.com/3/image');
    xhr2.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');

    // let firstStep = document
    //   .getElementsByClassName('sc-1asno00-0 iyBsWP')[0]
    //   .innerHTML.replace('<img src="', '');
    // let profileImg = firstStep.replace(
    //   '" width="40" height="40" alt="' +
    //     document.getElementsByClassName('sc-fzozJi daCWkW')[0].innerText +
    //     '" style="object-fit: cover; object-position: center top;">',
    //   ''
    // );

    const profileLinks = document
      .querySelector('aside')
      .querySelectorAll('a[href^="/en/users/"]');
    const profileImg = profileLinks[0].querySelector('img').src;
    const profileName = profileLinks[1].innerHTML;

    var dataFields2 = new FormData();
    dataFields2.append('image', profileImg);
    dataFields2.append('type', 'URL');

    const artDescription = document.querySelector('figcaption');
    const artTitle =
      artDescription.querySelector('h1')?.innerHTML || 'Untitled';

    xhr.onloadend = function (evt) {
      var responseJSON = JSON.parse(xhr.responseText);

      xhr2.send(dataFields2);
      xhr2.onloadend = function (evt) {
        var profileJSON = JSON.parse(xhr2.responseText);

        request.setRequestHeader('Content-type', 'application/json');
        //get name and profile pic
        chrome.storage.sync.get(
          {
            name: 'Pixcord',
            discordImage: 'https://i.imgur.com/VQFaBcn.png'
          },
          function (items) {
            var params = {
              username: items.name,
              avatar_url: items.discordImage,
              content: '',
              embeds: [
                {
                  title: artTitle,
                  url: location.href,
                  color: 7506394,
                  author: {
                    profileName,
                    url: profileLinks[0].href,
                    icon_url: profileJSON.data.link
                  },
                  footer: {
                    text: 'Pixcord developed by @DaikiPT'
                  },
                  timestamp: new Date(),
                  image: {
                    url: responseJSON.data.link
                  }
                }
              ]
            };
            request.send(JSON.stringify(params));
            button ? (button.innerHTML = '✔️Shared') : null;
          }
        );
      };
    };

    xhr.onerror = function (err) {
      // untested
      //console.log('Failed uploading image from ' + fileName + ': ' + JSON.stringify(err));
      //console.log('Output: ' + xhr.responseText);
      alert('Pixcord Upload Error');
    };
  }

  if (res.includes('webhooks')) {
    artShare(res);
  } else {
    if (!document.getElementById('PixcordSFW')) {
      //Creating the first div
      let divSFW = document.createElement('div');
      divSFW.className = 'sc-181ts2x-3 iujCSd';

      //SFW Button
      let sfw = document.createElement('BUTTON'); // Create a <button> node
      sfw.setAttribute('id', 'PixcordSFW');
      sfw.onclick = function () {
        artShare(
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
        artShare(
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
});
