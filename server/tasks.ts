import { CronJob } from "cron";
import { telegramBot } from "./tasks/telegramBot";
import { writePlayList } from "./tasks/writePlayList"

export default () => {
  // initial
  writePlayList();

  new CronJob('00 */10 * * * *', writePlayList).start();
  new CronJob('00 */20 * * * *', telegramBot).start();
}