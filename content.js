chrome.runtime.onMessage.addListener(function (res) {

    //Beta for the share button inside the page
    if(res == "discord"){
        function artShare(webhook){
            var request = new XMLHttpRequest();
            request.open("POST", webhook);
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
        }

        if(!document.getElementById("PixcordSFW")){
            //SFW Button
            let sfw = document.createElement("BUTTON");  // Create a <button> node
            sfw.setAttribute("id", "PixcordSFW")
            sfw.className = "js-click-trackable _2Of8xxg Pixcord"
            sfw.onclick = function () {
                artShare("https://discordapp.com/api/webhooks/547508568849383426/3ceqXPSXNmnEHikyR65GL0UHTJoASHZWeu49Re5IhBYszSjMwDv8hfspWFso_SoQ4SBI")
            };
            let t = document.createTextNode("Share to #art");      // Create a text node
            sfw.appendChild(t);                                          // Append the text to <p>
            document.getElementsByClassName("sc-181ts2x-0 jPZrYy")[0].appendChild(sfw);           // Append to <div>

            //NSFW Button
            let nsfw = document.createElement("BUTTON");  // Create a <button> node
            nsfw.setAttribute("id", "PixcordNSFW")
            nsfw.className = "js-click-trackable _2Of8xxg Pixcord"
            nsfw.onclick = function () {
                artShare("https://discordapp.com/api/webhooks/738107690672324639/GQeX-g04uhrHrLbxM4qV2E1ePRbUeXZd9xwX7lJCVcJDtrY-Bs3pSA15mm2cjoewQjxb")
            };
            let t2 = document.createTextNode("Share to #NSFW");      // Create a text node
            nsfw.appendChild(t2);                                          // Append the text to <p>
            document.getElementsByClassName("sc-181ts2x-0 jPZrYy")[0].appendChild(nsfw);           // Append to <div>
        }
    } else{ //Sharing through the popup
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

    }

})

