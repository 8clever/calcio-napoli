import { AmpImg, AmpSidebar, Button } from "react-amphtml";
import { Container } from "./Grid";
import { media } from "./Media";
import { theme } from "./Theme";

export const Header = () => {
  return (
    <div className="header">
      <Container>
        <div className="head">
          <a 
            style={{ 
              textDecoration: "none",
              display: 'flex', 
              alignItems: 'center' 
            }}
            href="/">
            <AmpImg
              style={{
                minWidth: 40
              }}
              width="40"
              height="40"
              layout="fixed"
              specName="default"
              src="/images/favicon.png"
            />
            <span className="brand-text">
              Calcio Napoli
            </span>
          </a>
          <div>
            <Button 
              className="hamburger"
              specName="default" 
              on="tap:header-sidebar.toggle">
              <div />
              <div />
              <div />
            </Button>
          </div>
        </div>
      </Container>
      <AmpSidebar 
        specName="default"
        id="header-sidebar" 
        layout="nodisplay" 
        side="right">
        {[ media.menu, media.media ].map((i,idx) => {
          return (
            <ul 
              key={idx}
              className="sidebar-list">
              {
                i.map(i => {
                  return (
                    <li
                      key={i.href}>
                      <a
                        href={i.href}>
                        {i.label}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          )
        })}
      </AmpSidebar>
      <style jsx>{`
        .header {
          background: ${theme.color.primary};
        }
        .header .head {
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header .sidebar-list {
          min-width: 200px;
          padding: 40px;
          list-style: none;
        }
        .header .sidebar-list li {
          padding: 8px;
        }
        .header .sidebar-list a {
          color: ${theme.color.white};
          text-decoration: none;
        }
        .header .brand-text {
          color: ${theme.color.white};
          padding: 0px 15px;
          font-weight: bold;
          font-size: 20px;
        }
        .header :global(#header-sidebar) {
          background: ${theme.color.black};
        }
        .header :global(.hamburger) {
          padding: 0;
          border: none;
          background-color: transparent;
          height: 27px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center
        }
        .header :global(.hamburger) div {
          width: 25px;
          height: 3px;
          background-color: ${theme.color.white};
        }
      `}</style>
    </div>
  )
}