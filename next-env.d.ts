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