import fs from "fs";

const cachePath = process.cwd() + "/cache/";

export const cache = {
  keys: {
    ytchannel: cachePath + "ytchannel.json"
  }
}

export const writeCache = (key:string, data: object) => {
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
  }
  fs.writeFileSync(key, JSON.stringify(data))
}

export const getCache = (key: string) => {
  return JSON.parse(fs.readFileSync(key).toString());
}