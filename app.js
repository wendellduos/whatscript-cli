const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");
const client = new Client({
  puppeteer: {
    args: [
      `--window-size=800,600`,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--disable-extensions",
      "--disable-component-extensions-with-background-pages",
      "--disable-default-apps",
      "--mute-audio",
      "--no-default-browser-check",
      "--autoplay-policy=user-gesture-required",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-notifications",
      "--disable-background-networking",
      "--disable-breakpad",
      "--disable-component-update",
      "--disable-domain-reliability",
      "--disable-sync",
    ],
  },
  headelss: true,
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");

  sendMessageToMyself();
});

client.initialize();

async function sendMessageToMyself() {
  const allContacts = await client.getContacts();

  let myId;

  allContacts.forEach((contact) => {
    if (contact.isMe) {
      myId = contact.id._serialized;
    }
  });

  client.sendMessage(myId, "test message");
}
