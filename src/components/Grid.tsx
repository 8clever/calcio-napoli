interface IProps {
  children?: React.ReactNode
}

export const Row = (props: IProps) => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          box-sizing: border-box;
        }

        div::after {
          content: "";
          clear: both;
          display: table;
        }
      `}</style>
    </div>
  )
}

export const Container = (props: IProps) => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        @media only screen and (min-width: 600px) {
          div {
            margin: 0 40px;
          }
        }
        @media only screen and (min-width: 768px) {
          div {
            margin: 0 80px;
          }
        }
      `}</style>
    </div>
  )
}

interface ICol extends IProps {
  md?: number;
  sm?: number;
}

export const Col = (props: ICol) => {
  return (
    <div className={`col-${props.md || 12} col-s-${props.sm || 12}`}>
      {props.children}
      <style jsx>{`
        div {
          box-sizing: border-box;
        }
        /* For mobile phones: */
        [class*="col-"] {
          width: 100%;
          float: left;
          padding: 15px;
        }
        @media only screen and (min-width: 600px) {
          /* For tablets: */
          .col-s-1 {width: 8.33%;}
          .col-s-2 {width: 16.66%;}
          .col-s-3 {width: 25%;}
          .col-s-4 {width: 33.33%;}
          .col-s-5 {width: 41.66%;}
          .col-s-6 {width: 50%;}
          .col-s-7 {width: 58.33%;}
          .col-s-8 {width: 66.66%;}
          .col-s-9 {width: 75%;}
          .col-s-10 {width: 83.33%;}
          .col-s-11 {width: 91.66%;}
          .col-s-12 {width: 100%;}
        }
        @media only screen and (min-width: 768px) {
          /* For desktop: */
          .col-1 {width: 8.33%;}
          .col-2 {width: 16.66%;}
          .col-3 {width: 25%;}
          .col-4 {width: 33.33%;}
          .col-5 {width: 41.66%;}
          .col-6 {width: 50%;}
          .col-7 {width: 58.33%;}
          .col-8 {width: 66.66%;}
          .col-9 {width: 75%;}
          .col-10 {width: 83.33%;}
          .col-11 {width: 91.66%;}
          .col-12 {width: 100%;}
        }  
      `}</style>
    </div>
  )
}