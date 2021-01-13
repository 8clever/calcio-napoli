import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import moment from "moment";
import { GetServerSideProps } from "next";

interface IProps {
  html: string;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const dateStart = moment.utc().add(-1, "year").format("YYYY");
  const dateEnd = moment.utc().format("YYYY");
  const url = `https://sharing.iamcalcio.it/classifiche/3/serie-a/${dateStart}-${dateEnd}/4.html`;
  const response = await fetch(url);
  const html = (await response.text())
    .replace(/^.+(<table)/gm, "$1")
    .replace(/(<\/table>).+/, "$1")
    .replace(/!important/gmi, "")
    .replace(/img/gmi, "amp-img layout='responsive' height='20'");
  return {
    props: {
      html
    }
  }
}

export const Games = (props: IProps) => {
  return (
    <Layout 
      description="Classifica Serie A tim"
      title="Calcio Napoli | Classifica Serie A tim">
      <Container page>
        <h1>Classifica Serie A tim</h1>
        <div className="table">
          <div dangerouslySetInnerHTML={{
            __html: props.html
          }} />
        </div>
      </Container>
      <style jsx>{`
        .table {
          display: flex;
        }

        div > div {
          margin: auto
        }

        :global(.leaguetable) {
          width: 100%;
          border-spacing:0;
          margin: 0;
          padding: 0;
        }

        :global(.leaguetable caption ul li){
          display: inline;
          margin-right: 4px;
        }


        :global(.leaguetable tr.title td span) {
          font-weight: bold;
        }

        :global(.leaguetable td.name a.detaillink) {
          font-size: 14px;
          font-style: normal;
          color: #000;
          text-decoration: none;
        }

        :global(.leaguetable td.name a.detaillink:hover) {
          text-decoration: underline;
        }

        :global(.leaguetable tfoot ul) {
          list-style-type: square;
          list-style-position: outside;
        }

        :global(.leaguetable tfoot ul li) {
          display: block;
        }

        :global(.leaguetable tfoot ul li b) {
          float: left;
          width: 6px;
          height: 6px;
          margin-right: 4px;
        }

        :global(.leaguetable tfoot td) {
          text-align: left;
          padding-left: 4px;
        }

        :global(.leaguetable tfoot td img) {
          display: block;
          margin: 10px auto;
        }

        /**/
        :global(.leaguetable) tr td {
          padding: 2px 0;
          
        }

        :global(.leaguetable th) {
          background:#FFCC00;
        }

        :global(.leaguetable tr th:nth-child(1)),
        :global(.leaguetable tr td:nth-child(1)) {
          /*display:none;*/
        }

        :global(.leaguetable tr th:nth-child(2)) {
          font-size: 14px;
          font-style: normal;
          color: #000;
          padding-left: 5px;
        }

        :global(.leaguetable tr td:nth-child(3)) {
          font-size: 14px;
          font-weight: bolder;
        }


        :global(.leaguetable th abbr) {
          display: inline-block;
          font-size: 14px;
          font-style: normal;
          color: #000;
          text-decoration: none;
          text-align: center;
          width:20px;
          padding-left: 7px;
          border: 0;
          cursor: pointer;
          padding-left: 4px;
          position: relative;

        }

        :global(.leaguetable th abbr i) {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 12px;

        }

        :global(.leaguetable th.name) {
          text-align: left;
          background:#FFCC00;
        }

        :global(.leaguetable tr:nth-child(odd)) { background: #F7F5F6; }
        :global(.leaguetable tr:nth-child(even)) { background: #FFFFFF ; }

        :global(.leaguetable td.name) {
          text-align: left;
          padding-left: 29px;
          background-position: left center;
          background-repeat:no-repeat;
          background-size: 20px 20px;
        }

        :global(.leaguetable td.name span.handicap) {
          color: red;
          font-size: 16px;
          line-height: 16px;
        }

        :global(.leaguetable td) {
          font-size: 14px;
          font-style: normal;
          color: #000;
          text-decoration: none;
          text-align: center;
          padding: 0;
        }

        :global(.leaguetable ul) {
          list-style-type: none;
          padding: 0px;
          margin: 10px 0px 0px 0px;
        }

        :global(.leaguetable ul li) {
          display: inline;
          padding: 1px; 
        }

        :global(.leaguetable tfoot ul) {
          font-size: 12px;
          list-style-type: square;
          list-style-position: outside;
        }

        :global(.leaguetable tfoot ul li) {
          display: inline-block;
        }

        :global(.leaguetable tfoot ul li b) {
          float: left;
          width: 6px;
          height: 6px;
          margin: 5px 4px 0 6px;
          border: 1px solid #999;
        }

        :global(.leaguetable tfoot ul li span) {
        }

        :global(.leaguetable tfoot td) {
          text-align: left;
          padding-left: 4px;
        }

        :global(.leaguetable ul li a) {
          font-size: 16px;
          font-style: normal;
          font-weight: normal;
          color: #000;
          text-decoration: none;
        }

        :global(.leaguetable ul li a:hover) {
          text-decoration:underline;
        }

        :global(.leaguetable ul li a.active) {
          padding: 0 3px 0 3px;
          font-size: 16px;
          font-style: normal;
          font-weight: bold;
          color: #FFF;
          background-color: #474747;
          text-decoration: none;
        }

        :global(.leaguetable td:nth-child(3) a) {
          color: #000;
          text-decoration: none;
        }

        :global(.leaguetable td:nth-child(3) a:hover) {
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  )
}

export const config = {
  amp: true
}

export default Games;