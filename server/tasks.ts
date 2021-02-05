import { CronJob } from "cron";
import { getPlaylist } from "scrape-yt";
import { cache, writeCache } from "../src/components/Cache";
import { media } from "../src/components/Media";

const writePlayList = async () => {
  const list = await getPlaylist(media.playListId, {
    useWorkerThread: true
  });
  writeCache(cache.keys.ytchannel, list);
  console.log("task:writePlayList");
};

export default () => {
  // initial
  writePlayList();

  new CronJob('00 */10 * * * *', writePlayList).start();
}