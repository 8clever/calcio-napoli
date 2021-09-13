interface IProps {
  children?: React.ReactNode
}

export const Row = (props: IProps) => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          grid-template: "1 2 3 4 5 6 7 8 9 10 11 12";
          grid-template-columns: repeat(12, 1fr);
          display: grid;
          padding-bottom: 15px;
          gap: 15px;
        }
      `}</style>
    </div>
  )
}

interface IContainer extends IProps {
  page?: boolean;
  fluid?: boolean;
}

export const Container = (props: IContainer) => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          overflow: hidden;
          ${
            props.fluid ? "" :
            "margin: 0 10px;"
          }
          ${
            props.page ?
            "min-height: calc(100vh - 50px);" :
            ""
          }
        }

        @media only screen and (min-width: 600px) {
          div {
            margin: 0 10%;
          }
        }
        @media only screen and (min-width: 768px) {
          div {
            margin: 0 20%;
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
        /* For mobile phones: */
        [class*="col-"] {
          grid-column: span 12;
        }
        @media only screen and (min-width: 600px) {
          /* For tablets: */
          .col-s-1 {grid-column: span 1}
          .col-s-2 {grid-column: span 2}
          .col-s-3 {grid-column: span 3}
          .col-s-4 {grid-column: span 4}
          .col-s-5 {grid-column: span 5}
          .col-s-6 {grid-column: span 6}
          .col-s-7 {grid-column: span 7}
          .col-s-8 {grid-column: span 8}
          .col-s-9 {grid-column: span 9}
          .col-s-10 {grid-column: span 10}
          .col-s-11 {grid-column: span 11}
          .col-s-12 {grid-column: span 12}
        }
        @media only screen and (min-width: 768px) {
          /* For desktop: */
          .col-1 {grid-column: span 1}
          .col-2 {grid-column: span 2}
          .col-3 {grid-column: span 3}
          .col-4 {grid-column: span 4}
          .col-5 {grid-column: span 5}
          .col-6 {grid-column: span 6}
          .col-7 {grid-column: span 7}
          .col-8 {grid-column: span 8}
          .col-9 {grid-column: span 9}
          .col-10 {grid-column: span 10}
          .col-11 {grid-column: span 11}
          .col-12 {grid-column: span 12}
        }  
      `}</style>
    </div>
  )
}