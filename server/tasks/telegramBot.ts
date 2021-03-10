import TelegramBot from "node-telegram-bot-api";
import { PlaylistDetailed } from "scrape-yt";
import { getCache, cache } from "../../src/components/Cache";
import { media } from "../../src/components/Media";

const token = '1693769340:AAElnFDlmx54JBDxNN-mLhUuAr7-th_5nqY';

const chatId = "napolicalcionotizie"

export const telegramBot = async () => {
  if (process.env.NODE_ENV === "development") return;
  const bot = new TelegramBot(token);
  const chat = await bot.getChat("@" + chatId);
  const data = getCache(cache.keys.ytchannel) as PlaylistDetailed;

  for (const v of data.videos) {
    const url = media.domain + "/news/" + v.id;
    const response = await fetch(`https://t.me/s/${chatId}?q=/${v.id}`);
    const text = await response.text();

    if (text.includes("No posts found")) {
      bot.sendMessage(chat.id, url);

      // we can send only 20 messages per minute
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  bot.close();
  console.log("task:telegramBot");
}