/* global chrome, io */
let _react = "asset-manifest.json", // react manifest
  _tabs = []; // tabs with extension active

let readTextFile = (file, callback) => {
  // file has to be in the root (/public)
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    callback(rawFile.responseText);
    if (rawFile.readyState === 4 && rawFile.status === 200) {
    }
  };
  rawFile.send(null);
};
let disable = () => {
  for (let i = 0; i < _tabs.length; i += 1) {
    const tab = _tabs[i];

    let code = `document.querySelectorAll('#shareit-inspireit--chrome-extension').forEach(el => el.remove())`;

    chrome.tabs.executeScript(tab.id, { code: code });
    chrome.browserAction.setBadgeText({ text: "", tabId: tab.id });
  }
  _tabs = [];
};
let enable = (tab) => {
  const code = `if (document.querySelectorAll('#shareit-inspireit--chrome-extension').length) {
    document.querySelectorAll('#shareit-inspireit--chrome-extension').forEach(el => el.remove());
  }`;

  chrome.tabs.executeScript(tab.id, { code: code });

  // get the REACT manifest
  readTextFile(_react, function (text) {
    try {
      const _data = JSON.parse(text);

      let _keys = Object.keys(_data.files),
        _js = [
          _data.files["main.js"],
          _data.files[_keys[3]],
          _data.files[_keys[5]],
        ];

      // inject all the JS files required
      _js.forEach((file) => {
        console.warn("injecting:", file);
        chrome.tabs.executeScript(tab.id, {
          file: file,
        });
      });
      // inject styles
      chrome.tabs.insertCSS(tab.id, {
        file: _data.files["main.css"],
      });

      // badge
      // chrome.browserAction.setBadgeText({ text: "ON", tabId: tab.id });
      // chrome.browserAction.setBadgeBackgroundColor({ color: "crimson" });

      _tabs.push(tab);
    } catch (error) {}
  });
};

// extension clicked on/off
chrome.browserAction.onClicked.addListener((tab) => {
  const _on = _tabs.find((t) => t.id === tab.id);
  console.warn("clicking on it!", _on);
  _on ? disable(tab) : enable(tab);

  // _on ? disable(tab) : enable(tab);
  // _on = !_on;
});

/**
{
      name: "André Alves",
      avatar:
        "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png",
    }
 */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("request", request);
  console.log("sender", sender);

  switch (String(request.action).toLowerCase()) {
    case "get-id":
      sendResponse(chrome.runtime.id);
      return true;
    case "login": {
      // TODO: login logic here!
      sendResponse({
        name: "André Alves",
        avatar:
          "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png",
      });
      return true;
    }
    default:
      return true;
  }
});

chrome.runtime.onSuspend.addListener(function () {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({ text: "" });
});

const socket = io("http://localhost:1337");

socket.on("connect", () => {
  socket.emit(
    "url",
    "https://dev.to/burhanuday/react-context-api-usereducer-redux-ogo#signout"
  );

  socket.emit("url", "https://reactjs.org/docs/strict-mode.html");

  socket.emit(
    "url",
    "https://developer.chrome.com/extensions/runtime#method-sendMessage"
  );
});

socket.on("message", (message) => {
  console.warn("handle message", message);
  chrome.browserAction.setBadgeText({ text: String(message.count) });
  chrome.browserAction.setBadgeBackgroundColor({ color: "crimson" });
});

socket.on("new-share", (metadata) => {
  console.warn("new-share", metadata);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const [tab] = tabs;

    if (!tab) return;

    chrome.tabs.sendMessage(
      tab.id,
      { action: "new-share", metadata },
      function (response) {}
    );
  });

  // chrome.browserAction.setBadgeText({ text: String(message.count) });
  // chrome.browserAction.setBadgeBackgroundColor({ color: "crimson" });
});
