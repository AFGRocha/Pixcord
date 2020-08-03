chrome.runtime.onMessage.addListener(function (res) {
    var request = new XMLHttpRequest();
    request.open("POST", res);
    // replace the url in the "open" method with yours
    var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();



    //Art upload settings
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');

    var dataFields = new FormData();
    dataFields.append('image', document.getElementsByClassName('sc-1qpw8k9-1 fvHoJ')[0].src);
    dataFields.append('type', 'URL');
    xhr.send(dataFields)

    //Profile picture upload settings
    xhr2.open("POST", "https://api.imgur.com/3/image");
    xhr2.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');


    let firstStep = document.getElementsByClassName('sc-1asno00-0 iyBsWP')[0].innerHTML.replace('<img src="', '');
    let profileImg = firstStep.replace('" width="40" height="40" alt="' + document.getElementsByClassName('sc-fzpisO')[0].innerHTML + '" style="object-fit: cover; object-position: center top;">', '')
    var dataFields2 = new FormData();
    dataFields2.append('image', profileImg);
    dataFields2.append('type', 'URL');


    console.log(profileImg)
    xhr.onloadend = function (evt) {
        var responseJSON = JSON.parse(xhr.responseText);
        //console.log(JSON.stringify(responseJSON.data));

        xhr2.send(dataFields2)
        xhr2.onloadend = function (evt) {
            var profileJSON = JSON.parse(xhr2.responseText);

            request.setRequestHeader('Content-type', 'application/json');
            //get name and profile pic
            chrome.storage.sync.get({
                name: 'Pixcord',
                discordImage: 'blue'
            }, function (items) {
                //document.getElementById('discordName').value = items.name;
                //document.getElementById('discordIMG').value = items.discordImage;

                var params = {
                    username: items.name,
                    avatar_url: items.discordImage,
                    content: "",
                    embeds: [
                        {
                            "title": document.getElementsByClassName('sc-1u8nu73-3')[0].innerHTML,
                            "url": location.href,
                            "color": 7506394,
                            "author": {
                                "name": document.getElementsByClassName('sc-fzpisO')[0].innerHTML,
                                "url": document.getElementsByClassName('sc-fzpisO')[0].href,
                                "icon_url": profileJSON.data.link
                            },
                            "footer": {
                                "text": "Pixcord developed by @DaikiPT"
                            },
                            "timestamp": new Date(),
                            "image": {
                                "url": responseJSON.data.link
                            }
                        }
                    ]
                }
                console.log(JSON.stringify(params))
                request.send(JSON.stringify(params));
                alert("Shared")


            })


        }


    };

    xhr.onerror = function (err) { // untested
        // console.log('Failed uploading image from ' + fileName + ': ' + JSON.stringify(err));
        //console.log('Output: ' + xhr.responseText);
        alert("Pixcord Upload Error")
    };

})