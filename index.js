window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("sfwShare").addEventListener("click", onclick);
    document.getElementById("nsfwShare").addEventListener("click", onclickNSFW);

});

function onclick(){
    chrome.tabs.query({currentWindow: true, active: true},
    function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "https://discordapp.com/api/webhooks/547508568849383426/3ceqXPSXNmnEHikyR65GL0UHTJoASHZWeu49Re5IhBYszSjMwDv8hfspWFso_SoQ4SBI")
    })
}

function onclickNSFW(){
    chrome.tabs.query({currentWindow: true, active: true},
    function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "https://discordapp.com/api/webhooks/738107690672324639/GQeX-g04uhrHrLbxM4qV2E1ePRbUeXZd9xwX7lJCVcJDtrY-Bs3pSA15mm2cjoewQjxb")
    })
}