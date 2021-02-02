import fs from "fs";

export const cache = {
  keys: {
    ytchannel: process.cwd() + "/cache/ytchannel.json"
  }
}

export const writeCache = (key:string, data: object) => {
  fs.writeFileSync(key, JSON.stringify(data))
}

export const getCache = (key: string) => {
  return JSON.parse(fs.readFileSync(key).toString());
}