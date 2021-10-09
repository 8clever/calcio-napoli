import fs from "fs";
import util from 'util';

export class Cache<T> {

  rootPath = process.cwd() + "/cache/";

  constructor () {
    this.makeRoot();
  }

  private getPath (key: string) {
    return this.rootPath + key;
  }

  private async makeRoot () {
    const isExistCachePath = await util.promisify(fs.exists)(this.rootPath);
    if (isExistCachePath) return;
    await util.promisify(fs.mkdir)(this.rootPath);
  }

  async write (key: string, data: T) {
    await util.promisify(fs.writeFile)(this.getPath(key), JSON.stringify(data));
  }

  async isExists (key: string) {
    return util.promisify(fs.exists)(this.getPath(key));
  }

  async get (key: string): Promise<T> {
    const file = await util.promisify(fs.readFile)(this.getPath(key));
    const text = file.toString();
    return JSON.parse(text);
  }
}