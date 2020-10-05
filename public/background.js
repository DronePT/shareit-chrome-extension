/* global chrome, io */
const _react = "asset-manifest.json"; // react manifest
let _tabs = []; // tabs with extension active

const readTextFile = (file, callback) => {
  // file has to be in the root (/public)
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status === 200) {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
};

const disable = () => {
  // for (let i = 0; i < _tabs.length; i += 1) {
  //   const tab = _tabs[i];
  //   const code = `document.querySelectorAll('#shareit-inspireit--chrome-extension').forEach(el => el.remove())`;
  //   chrome.tabs.executeScript(tab.id, { code: code });
  //   chrome.browserAction.setBadgeText({ text: "", tabId: tab.id });
  // }
  _tabs = [];
};

const executeCode = (tab, code) =>
  new Promise((resolve) => {
    chrome.tabs.executeScript(tab.id, { code }, (executedCode) => {
      resolve(executedCode);
    });
  });

const toggleExtension = (tab) => {
  const code = `document.querySelectorAll('#shareit-inspireit--chrome-extension').length;`;

  executeCode(tab, code).then(([alreadyInjected]) => {
    if (alreadyInjected) {
      const tabStatusIndex = _tabs.findIndex((t) => t.tab.id === tab.id);
      const tabStatus = _tabs[tabStatusIndex];

      executeCode(
        tab,
        `document.querySelector('#shareit-inspireit--chrome-extension').style.display = '${
          tabStatus.visible ? "none" : "flex"
        }';`
      ).then();

      _tabs[tabStatusIndex] = {
        ...tabStatus,
        visible: !tabStatus.visible,
      };

      return;
    }

    // get the REACT manifest
    readTextFile(_react, function (text) {
      try {
        const _data = JSON.parse(text);

        const _keys = Object.keys(_data.files),
          _js = [
            _data.files["main.js"],
            _data.files[_keys[3]],
            _data.files[_keys[5]],
          ];

        // inject all the JS files required
        _js.forEach((file) => {
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

        _tabs.push({ tab, visible: true });
      } catch (error) {}
    });
  });
};

chrome.runtime.onSuspend.addListener(function () {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({ text: "" });
});

const socket = io(
  "http://localhost:1337?token=token-example-goes-here-on-connect"
);

socket.on("connect", () => {
  console.warn("connected: ", socket.id);
});

socket.on("message", (message) => {
  chrome.browserAction.setBadgeText({ text: String(message.count) });
  chrome.browserAction.setBadgeBackgroundColor({ color: "crimson" });
});

socket.on("new-share", (metadata) => {
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

// extension clicked on/off
chrome.browserAction.onClicked.addListener((tab) => {
  toggleExtension(tab);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (String(request.action).toLowerCase()) {
    case "get-id":
      sendResponse(chrome.runtime.id);
      return true;
    case "share-post": {
      socket.emit("url", request.payload.url);

      sendResponse({ success: true });

      return true;
    }
    case "login": {
      // TODO: login logic here!
      if (
        request.payload.email === "andre.alves@inspireit.pt" &&
        request.payload.password === "123456"
      ) {
        sendResponse({
          name: "André Alves",
          avatar:
            "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png",
        });
        return true;
      }

      sendResponse({ error: "Invalid credentials!" });

      return true;
    }
    default:
      console.warn("request:", request);
      console.warn("sender:", sender);
      return true;
  }
});
