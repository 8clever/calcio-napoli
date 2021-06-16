/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "livesoccertv-parser" {
  export interface Match {
    live: boolean;
    played: boolean;
    competition: string;
    date: string;
    time: string;
    game: string;
    tvs: string[];
  }

  interface Options {
    timezone?: string
  }

  async function parse (country: string, team: string, options?: Options): Match[];

  export default parse;
};

declare module "react-adsense";

declare module 'heroku-client' {

  class App {}
  class Heroku {
    constructor (options: { token: string })

    get (path: string): Promise<App>
    post (path: string): Promise<App>
    put (path: string): Promise<App>
    delete (path: string): Promise<App>
  }

  export default Heroku;
}