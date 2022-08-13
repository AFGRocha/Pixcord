chrome.runtime.onMessage.addListener(function (res) {

    //Beta for the share button inside the page
    if(res == "discord"){
        function artShare(webhook,type){
            let button;
            if(type == "sfw")
            button = document.getElementById("PixcordSFW");
            else if (type == "nsfw")
            button = document.getElementById("PixcordNSFW")
            else if (type == "nega")
            button = document.getElementById("PixcordNEGA")

            button.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">'
            var request = new XMLHttpRequest();
            request.open("POST", webhook);

            var xhr = new XMLHttpRequest();
            var xhr2 = new XMLHttpRequest();



            //Art upload settings
            xhr.open("POST", "https://api.imgur.com/3/image");
            xhr.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');

            var dataFields = new FormData();
            dataFields.append('image', document.querySelector('main section figure img').src);
            dataFields.append('type', 'URL');
            xhr.send(dataFields)

            //Profile picture upload settings
            xhr2.open("POST", "https://api.imgur.com/3/image");
            xhr2.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');

            const profileLinks = document
            .querySelector('aside')
            .querySelectorAll('a[href^="/en/users/"]');

            let firstStep = profileLinks[0].querySelector('figure') || profileLinks[0].querySelector('img');
            let profileImg = firstStep.src
            var dataFields2 = new FormData();
            dataFields2.append('image', profileImg);
            dataFields2.append('type', 'URL');
            let artTitle = "Untitled"

            if(document.getElementsByClassName('sc-1u8nu73-3')[0])
                artTitle = document.getElementsByClassName('sc-1u8nu73-3')[0].innerHTML

            xhr.onloadend = function (evt) {
                var responseJSON = JSON.parse(xhr.responseText);

                xhr2.send(dataFields2)
                xhr2.onloadend = function (evt) {
                    var profileJSON = JSON.parse(xhr2.responseText);

                    request.setRequestHeader('Content-type', 'application/json');
                    //get name and profile pic
                    chrome.storage.sync.get({
                        name: 'Pixcord',
                        discordImage: 'https://i.imgur.com/VQFaBcn.png'
                    }, function (items) {

                        var params = {
                            username: items.name,
                            avatar_url: items.discordImage,
                            content: "",
                            embeds: [
                                {
                                    "title": artTitle ,
                                    "url": location.href,
                                    "color": 7506394,
                                    "author": {
                                        "name": profileLinks[1].innerText,
                                        "url": profileLinks[0].href,
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
                        request.send(JSON.stringify(params));
                        button.innerHTML = '✔️Shared'


                    })


                }


            };

            xhr.onerror = function (err) { // untested
                //console.log('Failed uploading image from ' + fileName + ': ' + JSON.stringify(err));
                //console.log('Output: ' + xhr.responseText);
                alert("Pixcord Upload Error")
            };
        }

        if(!document.getElementById("PixcordSFW")){
            //Creating the first div
            let divSFW = document.createElement('div');
            divSFW.className = 'sc-181ts2x-3 cXSAgn';

            //SFW Button
            let sfw = document.createElement('BUTTON'); // Create a <button> node
            sfw.setAttribute('id', 'PixcordSFW');
            sfw.onclick = function () {
            artShare("https://discord.com/api/webhooks/1007964692561539173/FsiPgYnmxdtxYaQkVTpo5966x8Sc6GCJ9cfUoa4OPnrTeya1wvITUSzuH7u8qJlHdtRz","sfw")
            };
            let t = document.createTextNode('Share to #art'); // Create a text node
            sfw.appendChild(t); // Append the text to <p>
            divSFW.appendChild(sfw);
            document
            .getElementsByClassName('sc-181ts2x-0 gMEAWM')[0]
            .appendChild(divSFW); // Append to <div>

            //Second div
            let divNSFW = document.createElement('div');
            divNSFW.className = 'sc-181ts2x-3 cXSAgn';

            //NSFW Button
            let nsfw = document.createElement('BUTTON'); // Create a <button> node
            nsfw.setAttribute('id', 'PixcordNSFW');
            nsfw.onclick = function () {
            artShare("https://discord.com/api/webhooks/1007964849168457748/DIJ6diBSJQlQiwbVYLLphqRAhlEaAPd9840E-7iqHsYUM0HkF-HUpSNuLV0QsvROtgFt","nsfw")
            };
            
            let t2 = document.createTextNode('Share to #NSFW'); // Create a text node
            nsfw.appendChild(t2); // Append the text to <p>
            divNSFW.appendChild(nsfw);
            document
            .getElementsByClassName('sc-181ts2x-0 gMEAWM')[0]
            .appendChild(divNSFW); // Append to <div>

            //Third Div
            let divNEGA = document.createElement("div");
            divNEGA.className = "sc-181ts2x-3 cXSAgn"

            //Nega EN
            let nega = document.createElement("BUTTON");  // Create a <button> node
            nega.setAttribute("id", "PixcordNEGA")
            nega.onclick = function () {
                artShare("https://discord.com/api/webhooks/835918455503978606/ixOZ3mP78Ph_akUrBz53WWKJ4bQ95xOcBKsJlTYGdgNYkZLSyZQ5YePylQDVQ0RCvWLn","nega")
            };
            let t3 = document.createTextNode("Share to AAAAA");      // Create a text node
            nega.appendChild(t3);  // Append the text to <p>
            divNEGA.appendChild(nega)
            document.getElementsByClassName("sc-181ts2x-0 gMEAWM")[0].appendChild(divNEGA);           // Append to <div>

        }
    } else{ //Sharing through the popup
        var request = new XMLHttpRequest();
        request.open("POST", res);

        var xhr = new XMLHttpRequest();
        var xhr2 = new XMLHttpRequest();



        //Art upload settings
        xhr.open("POST", "https://api.imgur.com/3/image");
        xhr.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');

        var dataFields = new FormData();
        dataFields.append('image', document.getElementsByClassName('sc-1qpw8k9-1 jOmqKq')[0].src);
        dataFields.append('type', 'URL');
        xhr.send(dataFields)

        //Profile picture upload settings
        xhr2.open("POST", "https://api.imgur.com/3/image");
        xhr2.setRequestHeader('Authorization', 'Client-ID d2906dca59f16f0');


        let firstStep = document.getElementsByClassName('sc-1asno00-0 iyBsWP')[0].innerHTML.replace('<img src="', '');
        console.log(firstStep)
        let profileImg = firstStep.replace('" width="40" height="40" alt="' + document.getElementsByClassName('sc-AxmLO fOviRP')[0].innerHTML + '" style="object-fit: cover; object-position: center top;">', '')
        var dataFields2 = new FormData();
        dataFields2.append('image', profileImg);
        dataFields2.append('type', 'URL');



        xhr.onloadend = function (evt) {
            var responseJSON = JSON.parse(xhr.responseText);


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
                                    "name": document.getElementsByClassName('sc-AxmLO fOviRP')[0].innerHTML,
                                    "url": document.getElementsByClassName('sc-AxmLO fOviRP')[0].href,
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
                    request.send(JSON.stringify(params));
                    alert("Shared")


                })


            }


        };

        xhr.onerror = function (err) { // untested
            //console.log('Failed uploading image from ' + fileName + ': ' + JSON.stringify(err));
            //console.log('Output: ' + xhr.responseText);
            alert("Pixcord Upload Error")
        };

    }

})

