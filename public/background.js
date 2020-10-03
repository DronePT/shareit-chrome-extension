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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({ message: Math.floor(Math.random() * 10 + 1) });
  return true;
});

chrome.runtime.onSuspend.addListener(function () {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({ text: "" });
});

console.warn("isto funciona?!");
const socket = io("http://localhost:1337");

setInterval(() => console.log("still alive!"), 1000);

socket.on("message", (message) => {
  console.warn("handle message", message);
  chrome.browserAction.setBadgeText({ text: String(message.count) });
  chrome.browserAction.setBadgeBackgroundColor({ color: "crimson" });
});
