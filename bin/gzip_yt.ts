import { readdir } from 'fs/promises';
import { Cache } from '../src/components/Cache';

async function run () {
  const list = await readdir(process.cwd() + "/cache");
  const cache = new Cache();
  const cacheCompress = new Cache({ compress: true });
  for (const key of list) {
    try {
      const data = await cache.get(key);
      cacheCompress.write(key, data);
    } catch (e) {
      console.log(`invalid key: ${key}, ${e.message}`);
    }
  }
}

run();