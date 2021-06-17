import Client from "heroku-client";

const { HEROKU_API_KEY, NODE_ENV } = process.env;

export class Heroku {

  public static isProduction = NODE_ENV === "production";

  private client: Client;

  private isReboot = false;

  constructor () {
    this.client = new Client({ token: HEROKU_API_KEY as string });
  }

  async reboot () {
    if (!Heroku.isProduction) return;
    if (this.isReboot) return;

    this.isReboot = true;
    await this.client.delete(`/apps/calcio-napoli/dynos`);
  }
}