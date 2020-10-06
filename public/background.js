/* global chrome, io */
const _react = "asset-manifest.json"; // react manifest
let _tabs = [], // tabs with extension active
  token = null,
  socket = null;

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

const sendToActiveTab = (message) =>
  new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const [tab] = tabs;

      if (!tab) return reject(new Error("no active tab found"));

      chrome.tabs.sendMessage(tab.id, message, function () {});

      resolve();
    });
  });

const connectToSocket = (token) => {
  if (socket) socket.disconnect();

  socket = io(`http://localhost:1337?token=${token}`);

  socket.on("connect", () => {
    console.warn("connected: ", socket.id);
  });

  socket.on("message", (message) => {
    chrome.browserAction.setBadgeText({ text: String(message.count) });
    chrome.browserAction.setBadgeBackgroundColor({ color: "crimson" });
  });

  socket.on("new-share", (metadata) => {
    sendToActiveTab({ action: "new-share", metadata }).catch((error) =>
      console.error(error)
    );
  });

  socket.on("new-like", (postId) => {
    sendToActiveTab({ action: "new-like", postId }).catch((error) =>
      console.error(error)
    );
  });
};

const fetchPosts = (page = 1) =>
  fetch(`http://localhost:1337/posts?page=${page}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      sendToActiveTab({ action: "posts", posts: response }).catch((error) =>
        console.error(error)
      );
    });

const saveStorage = (key, value) =>
  new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, function () {
      resolve(value);
    });
  });

const getFromStorage = (key) =>
  new Promise((resolve) => {
    chrome.storage.sync.get([key], function (result) {
      resolve(result[key]);
    });
  });

getFromStorage("token").then((value) => {
  token = value;
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
      fetch("http://localhost:1337/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request.payload),
      })
        .then((response) => response.json())
        .then((response) => {
          sendResponse({ success: true });
        });

      return true;
    }
    case "like-post": {
      fetch(`http://localhost:1337/posts/${request.payload.postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(() => {
          sendResponse({ success: true });
        });

      return true;
    }
    case "verify-login": {
      fetch("http://localhost:1337/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          sendResponse(response);
          connectToSocket(token);
          fetchPosts(1);
        });
      return true;
    }
    case "login": {
      fetch("http://localhost:1337/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(request.payload),
      })
        .then((response) => response.json())
        .then((response) => {
          sendResponse(response);

          if (response.token) {
            token = response.token;
            connectToSocket(token);
            saveStorage("token", token);
          }
        });
      return true;
    }
    case "logout": {
      token = undefined;
      saveStorage("token", token);
      if (socket) socket.disconnect();
      sendResponse({ success: true });
      return true;
    }
    default:
  }
});
