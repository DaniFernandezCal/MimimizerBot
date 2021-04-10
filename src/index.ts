import TelegramBot from 'node-telegram-bot-api';
import config from './config';

const TOKEN = config.token;
const bot = new TelegramBot(TOKEN, {
  polling: true,
});

const REGEX = [
  { input: /[aeou]/g, output: 'i' },
  { input: /[AEOU]/g, output: 'I' },
  { input: /[áéóú]/g, output: 'í' },
  { input: /[ÁÉÓÚ]/g, output: 'Í' },
  { input: /[âêôû]/g, output: 'î' },
  { input: /[ÂÊÔÛ]/g, output: 'Î' },
  { input: /[äëöü]/g, output: 'ï' },
  { input: /[ÄËÖÜ]/g, output: 'ï' },
  { input: /[àèòù]/g, output: 'ì' },
  { input: /[ÀÈÒÙ]/g, output: 'Ì' },
];

bot.on('polling_error', console.log);

bot.onText(/\/mimimize/, (msg) => {
  console.log(JSON.stringify(msg, null, 1));
  const msgReceived = msg.reply_to_message
    ? msg.reply_to_message.text
    : msg.text?.split('/mimimize ')[1];
  const mimimizedMsg = mimimize(msgReceived as string);
  console.log(`Message Received: ${msgReceived}`);
  console.log(`Message Mimimized: ${mimimizedMsg}`);
  bot.sendMessage(msg.chat.id, `${mimimizedMsg}`);
});

const mimimize = (msg: string) => {
  let text: string = msg;
  REGEX.map((reg) => {
    text = text.replace(reg.input, reg.output);
  });
  return text;
};
