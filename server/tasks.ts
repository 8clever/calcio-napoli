import { CronJob } from "cron";
import { writePlayList } from "./tasks/writePlayList"

export default () => {
  // initial
  writePlayList();

  new CronJob('00 */10 * * * *', writePlayList).start();
}