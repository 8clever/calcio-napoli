import { writeFile, mkdir, readFile, access } from 'fs/promises';
import { deflate, unzip } from "zlib";
import { promisify } from 'util';
import { Buffer } from 'buffer';

export class Cache<T> {

  rootPath = process.cwd() + "/cache/";

  constructor (
    private config: Cache.Config = {}
  ) {
    this.makeRoot();
  }

  private getPath (key: string) {
    return this.rootPath + key;
  }

  private async makeRoot () {
    try {
      await access(this.rootPath);
    } catch (e) {
      /** recreate folder if not accessed */
      await mkdir(this.rootPath);
    }
  }

  async write (key: string, data: T) {
    let buff = Buffer.from(JSON.stringify(data));
    if (this.config.compress) {
      const zipped = await promisify(deflate)(buff);
      buff = zipped;
    }
    await writeFile(this.getPath(key), buff);
  }

  async isExists (key: string) {
    try {
      await access(this.getPath(key))
      return true;
    } catch {
      return false;
    }
  }

  async get (key: string): Promise<T> {
    let file = await readFile(this.getPath(key));
    if (this.config.compress) {
      const unzipped = await promisify(unzip)(file);
      file = unzipped;
    }
    const text = file.toString();
    return JSON.parse(text);
  }
}

export namespace Cache {
  export interface Config {
    compress?: boolean;
  }
}