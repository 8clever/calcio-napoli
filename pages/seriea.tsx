import { GetServerSideProps } from "next";
import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import { footballApi } from "../src/api/football";
import { IFootball } from "../src/modules/FootballApi/types";
import { Image } from "../src/components/Hybrid";
import FootballDataApi from "../src/modules/FootballApi";

interface IProps {
  standing: IFootball.Competition.Standing
}

export const getServerSideProps: GetServerSideProps = async () => {
  const competition = await footballApi.leagueTable();

  return {
    props: {
      standing: competition.standings[0]
    }
  }
}

export const Games = (props: IProps) => {
  return (
    <Layout 
      hybrid
      description="Classifica Serie A tim"
      title="Calcio Napoli | Classifica Serie A tim">
      <Container page>
        <h1>Classifica Serie A tim</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>W</th>
              <th>L</th>
              <th>D</th>
            </tr>
          </thead>
          <tbody>
            {
              props.standing.table.map(p => {
                return (
                  <tr key={p.team.id}>
                    <td align="center">{p.position}</td>
                    <td style={{
                      padding: 5
                    }}>
                      <Image 
                        width={35}
                        height={35}
                        src={FootballDataApi.ImageUrl(p.team.id)}
                      />
                    </td>
                    <td style={{ padding: 5 }}>{p.team.name}</td>
                    <td align="center">{p.won}</td>
                    <td align="center">{p.lost}</td>
                    <td align="center">{p.draw}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Container>
      <style jsx>{`
        td {
          border: 1px solid #424242;
        }
        table {
          width: 100%;
          margin-bottom: 15px;
        }
        table tbody tr {
          transition: 0.3s all;
        }
        table tbody tr:hover {
          background: #131819d4;
        }
      `}</style>
    </Layout>
  )
}

export const config = {
  amp: "hybrid"
}

export default Games;