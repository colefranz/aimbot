(function(chrome) {
  'use strict';

  chrome.browserAction.onClicked.addListener(function() {
    var windowedKey = 'aimbot-windowed',
        screenWidth = screen.availWidth,
        screenHeight = screen.availHeight,
        width = 783,
        height = 600;

    chrome.storage.sync.get(windowedKey, function(items) {
      console.log(items);
      var windowed = items[windowedKey];

      if (windowed === true) {
        chrome.windows.create({
          'url': 'build/aimbot.html',
          'type': 'popup',
            width: width,
            height: height,
            left: Math.round((screenWidth-width)/2),
            top: Math.round((screenHeight-height)/2)
        });
      } else {
        chrome.browserAction.setPopup({
          popup: 'build/aimbot.html'
        });
      }
    });
  });
})(chrome);