import fetch from "node-fetch";
import { IFootball } from "./types";

export class FootballDataApi {

  private apiKey = "bcceb73ec95946fcb82e98685655a5e1"

  private source: string = "https://api.football-data.org/v2/";

  private teamId = 113;

  private leagueKey = "SA";

  private cache: {[key: string]: any} = {};

  private request = async (path: string) => {
      const response = await fetch(this.source + path, {
        headers: {
          "X-Auth-Token": this.apiKey
        }
      });
      const data = await response.json();
      if (data.errorCode === 429) {
        return this.cache[path];
      }
      this.cache[path] = data;
      return data;
  }

  leagueTable = async (): Promise<IFootball.Competition.Response> => {
    return this.request(`competitions/${this.leagueKey}/standings`);
  }

  matches = async (status: IFootball.Match.Status) => {
    const data = await  this.request(`competitions/${this.leagueKey}/matches?status=${status}`) as IFootball.Match.Response;
    const teamMatches = data.matches.filter(m => m.awayTeam.id === this.teamId || m.homeTeam.id === this.teamId);
    return teamMatches;
  }

  public static ImageUrl = (teamId: number) => {
    return `https://crests.football-data.org/${teamId}.svg`;
  }
}

export default FootballDataApi;