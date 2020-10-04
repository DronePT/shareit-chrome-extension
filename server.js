const Koa = require("koa");
const socketio = require("socket.io");
const http = require("http");
const got = require("got");
const metascraper = require("metascraper")([
  require("metascraper-title")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
  require("metascraper-description")(),
]);

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketio(server);

const sockets = {};

const getSocketsCount = () => Object.keys(sockets).length;
const getMetadata = async (targetUrl) => {
  const { body: html, url } = await got(targetUrl);
  const metadata = await metascraper({ html, url });
  return metadata;
};

io.on("connection", (socket) => {
  sockets[socket.id] = socket;

  io.emit("message", { count: getSocketsCount() });

  socket.on("disconnect", () => {
    console.warn("disconnected:", socket.id);
    delete sockets[socket.id];

    io.emit("message", { count: getSocketsCount() });
  });

  socket.on("url", async (targetUrl) => {
    const metadata = await getMetadata(targetUrl);

    io.emit("new-share", metadata);
  });

  console.warn("socket connected:", socket.id);
});

(async () => {
  const shares = [
    {
      title: "React Context API + useReducer() = Redux",
      image: "https://dev.to/social_previews/article/343520.png",
      url: "https://dev.to/burhanuday/react-context-api-usereducer-redux-ogo",
      description:
        "Redux is a state management solution for web applications. Although it is widely used with React, it...",
    },
    {
      title: "Gudnest - Plataforma de gestão de aves",
      image: "https://gudnest.com/static/fb-gudnest.jpg",
      url: "https://gudnest.com/",
      description:
        "Uma nova plataforma de gestão de aves, para criadores experientes ou que ainda estejam a dar os primeiros passos.",
    },
    {
      title: "Strict Mode – React",
      image: "https://reactjs.org/logo-og.png",
      url: "https://reactjs.org/docs/strict-mode.html",
      description: "A JavaScript library for building user interfaces",
    },
    {
      title: "chrome.runtime - Google Chrome",
      image: "https://developer.chrome.com/static/images/chrome-logo_2x.png",
      url: "https://developer.chrome.com/extensions/runtime#method-sendMessage",
      description: null,
    },
    {
      title: "metascraper",
      image: "https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png",
      url: "https://www.npmjs.com/package/metascraper",
      description:
        "A library to easily scrape metadata from an article on the web using Open Graph, JSON+LD, regular HTML metadata, and series of fallbacks.",
    },
    {
      title: "Início | Cenas Factory",
      image:
        "https://cenasfactory.com/wp-content/uploads/2020/05/cenasfactory.jpg",
      url: "https://cenasfactory.com",
      description:
        "Da ideia ao software… Utilizamos um processo hiper mega rigoroso na seleção das ideas que fazemos! Olha só: Ideia maluca na <header> A ideia surge e é compartilhado o <title> com o restante dos idiotas. Abraçamos a ideia como se fosse de todos! Desenvolvemos o <body> Assim que ele tiver <footer> pa…",
    },
    {
      title: "Old documentation",
      image:
        "https://app.gitbook.com/share/space/thumbnail/-MECxxaGCUi7IxCIBmhL.png",
      url: "https://docs.typestack.community/typedi/v/develop/",
      description: null,
    },
    {
      title: "jessekorzan/react-chrome-extension",
      image: "https://avatars2.githubusercontent.com/u/1870759?s=400&v=4",
      url: "https://github.com/jessekorzan/react-chrome-extension",
      description:
        "Chrome Extension boilerplate with React. Contribute to jessekorzan/react-chrome-extension development by creating an account on GitHub.",
    },
  ];

  const share = async () => {
    // const metadata = await getMetadata("https://gudnest.com");
    const rand = Math.floor(Math.random() * shares.length);

    io.emit("new-share", shares[rand]);
    console.warn("sharing...");
    console.dir(shares[rand]);

    setTimeout(share, 5000 + Math.random() * 5);
  };

  share();
})();

server.listen(1337, () => console.warn("running :1337"));
