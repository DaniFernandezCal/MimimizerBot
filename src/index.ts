import TelegramBot from 'node-telegram-bot-api';
import config from './config';

const token = config.token;
const bot = new TelegramBot(token, { polling: true });

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

bot.onText(/\/mimimize/, (msg) => {
  const msgReceived = msg.reply_to_message
    ? msg.reply_to_message.text
    : msg.text?.split('/mimimize ')[1];
  const mimimizedMsg = mimimize(msgReceived as string);
  console.log(`Message Received: ${msgReceived}`);
  bot.sendMessage(msg.chat.id, `${mimimizedMsg}`);
});

const mimimize = (msg: string) => {
  let text: string = msg;
  REGEX.map((reg) => {
    text = text.replace(reg.input, reg.output);
  });
  return text;
};
