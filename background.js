chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo)
    setTimeout(function () {
        console.log("loaded")
        chrome.tabs.sendMessage(tabId, "discord")
    }, 5000);

});