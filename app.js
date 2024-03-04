const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
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
