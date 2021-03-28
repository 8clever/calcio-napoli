export declare namespace IFootball {

  namespace Competition {

    interface Response {
      filters: {},
      competition: Competition,
      season: Season,
      standings: Standing[]
    }
  
    interface Competition {
      id: number,
      area: { id: number, name: string },
      name: string,
      code: string,
      plan: string,
      lastUpdated: string
    }
  
    interface Season {
      id: number,
      startDate: string,
      endDate: string,
      currentMatchday: number,
      winner?: string;
    }
  
    interface Standing {
      stage: 'REGULAR_SEASON',
      type: 'TOTAL',
      group?: string,
      table: Position[]
    }
  
    interface Position {
      position: number,
      team: {
        id: number,
        name: string,
        crestUrl: string;
      },
      playedGames: number,
      form?: string,
      won: number,
      draw: number,
      lost: number,
      points: number,
      goalsFor: number,
      goalsAgainst: number,
      goalDifference: number
    }
  }


  namespace Match {

    type Status = "SCHEDULED" | "LIVE"

    interface Response {
      filters: {},
      competition: Competition.Competition,
      matches: Item[]
    }

    interface Item {
      id: number,
      season: {
        id: number,
        startDate: string,
        endDate: string,
        currentMatchday: number
      },
      utcDate: string,
      status: Status,
      matchday: number,
      stage: 'REGULAR_SEASON',
      group: 'Regular Season',
      lastUpdated: string,
      odds: { msg: string },
      score: {
        winner: null,
        duration: 'REGULAR',
        fullTime: { homeTeam: null, awayTeam: null },
        halfTime: { homeTeam: null, awayTeam: null },
        extraTime: { homeTeam: null, awayTeam: null },
        penalties: { homeTeam: null, awayTeam: null }
      },
      homeTeam: { id: number, name: string },
      awayTeam: { id: number, name: string },
      referees: []
    }
  }
}