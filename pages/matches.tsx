import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import React from "react";
import { GetServerSideProps } from "next";
import { footballApi } from "../src/api/football";
import { IFootball } from "../src/modules/FootballApi/types";
import { Image } from "../src/components/Hybrid";
import FootballDataApi from "../src/modules/FootballApi";
import moment from "moment";

const title = "Calcio Napoli - Partite recenti e imminenti del"

interface IProps {
  live: IFootball.Match.Item[],
  scheduled: IFootball.Match.Item[],
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const [ live, scheduled ] = await Promise.all([
    footballApi.matches("LIVE"),
    footballApi.matches("SCHEDULED")
  ]);
  
  return {
    props: {
      live,
      scheduled
    }
  }
}

interface MatchInfoProps {
  match: IFootball.Match.Item
}

const MatchInfo = (props: MatchInfoProps) => {
  const m = props.match;

  return (
    <div className="match" key={m.id}>
      <div className="detail">
        <div className="left-name">
          {m.homeTeam.name}
        </div>
        <div className="left-img">
          <Image 
            width={40}
            height={40}
            src={FootballDataApi.ImageUrl(m.homeTeam.id)}
          />
        </div>
        <div className="vs">
          VS
        </div>
        <div className="right-img">
          <Image 
            width={40}
            height={40}
            src={FootballDataApi.ImageUrl(m.awayTeam.id)}
          />
        </div>
        <div className="right-name">
          {m.awayTeam.name}
        </div>
      </div>
      <div className="time">
        {moment.utc(m.utcDate).local().format("DD.MM HH:mm")}
      </div>
      <style jsx>{`
        .match {
          border-radius: 4px;
          padding: 10px;
          border: 1px solid #424242;
          margin-bottom: 20px;
        }
        .detail {
          display: flex;
          justify-content: center;
        }
        .detail .left-name,
        .detail .left-img {
          text-align: right;
        }
        .detail .left-name,
        .detail .right-name {
          width: 30%;
          padding: 10px;
        }
        .detail .left-img,
        .detail .right-img {
          padding: 0 5px;
        }
        .detail .vs {
          padding: 0 10px;
          text-align: center;
          width: 20%;
        }
        .time {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export const Matches = (props: IProps) => {
  return (
    <Layout hybrid title={title} description={title}>
      <Container page>
        {
          props.live.length ?
          <div className="live-title">Partita in diretta</div> :
          null
        }
        {
          props.live.map(m => {
            return (
              <MatchInfo key={m.id} match={m} />
            )
          })
        }

        <h1>Partite recenti e imminenti del</h1>
        {
          props.scheduled.map(m => {
            return (
              <MatchInfo key={m.id} match={m} />
            )
          })
        }
      </Container>
      <style jsx>{`
        .live-title {
          font-size: 2em;
          margin-block-start: 0.67em;
          margin-block-end: 0.67em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }
      `}</style>
    </Layout>
  ) 
}

export const config = {
  amp: "hybrid"
}

export default Matches;