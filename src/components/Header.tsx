import { Container } from "./Grid";
import { Button, Image, Lightbox, Sidebar } from "./Hybrid";
import { Search } from "./Icon";
import { media } from "./Media";
import { theme } from "./Theme";
import React from "react";

export const Header = () => {
  const [ sidebar, setSidebar ] = React.useState(false);
  const [ lightbox, setLightbox ] = React.useState(false);

  return (
    <header className="header">
      <Container>
        <div className="head">
          <a 
            style={{ 
              textDecoration: "none",
              display: 'flex', 
              alignItems: 'center' 
            }}
            href="/">
            <Image
              alt="Clacio Napoli"
              style={{
                minWidth: 40
              }}
              width="40"
              height="40"
              src="/images/favicon.png"
            />
            <span className="brand-text">
              Calcio Napoli
            </span>
          </a>
          <div style={{
            display: "flex",
            alignItems: "center"
          }}>
            <Button 
              title="Search"
              on="tap:search-sidebar"
              onClick={() => {
                setLightbox(true)
              }}
              className="search-icon">
              <Search />
            </Button>
            <Button 
              title="Menu"
              className="hamburger"
              onClick={() => {
                setSidebar(true);
              }}
              on="tap:header-sidebar.toggle">
              <div />
              <div />
              <div />
            </Button>
          </div>
        </div>
      </Container>
      <Lightbox
        open={lightbox}
        style={{
          background: "rgba(0,0,0,0.9)",
        }}
        id="search-sidebar">
        <Container>
          <div style={{
            marginTop: 15,
            textAlign: "right"
          }}>
            <Button 
              style={{
                fontSize: 20,
                cursor: "pointer",
                background: "none",
                border: "none",
                color: theme.color.white
              }}
              onClick={() => setLightbox(false)}
              on="tap:search-sidebar.close">X
            </Button>
          </div>
          <div 
            className="search-input">
            <form method="GET" action="/search" target="_top">
              <input 
                type="search"
                placeholder="Ricerca..."
                name="q" 
                required 
              />
              <button 
                type="submit">
                Go
              </button>
            </form>
          </div>
        </Container>
      </Lightbox>
      <Sidebar
        open={sidebar}
        className="sidebar"
        toggle={() => setSidebar(false)}
        id="header-sidebar"> 
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
      </Sidebar>
      <style jsx>{`
        :global(*) {
          outline: none;
          appearance: none;
        }
        .header :global(.search-icon) {
          background: none;
          border: none;
          padding: 2px;
          margin-right: 15px;
          height: 25px;
          width: 25px;
          color: ${theme.color.white};
          cursor: pointer;
        }
        .search-input {
          margin-top: 60px;
        }
        .search-input *[type='search'] {
            width: 80%;
          }  
        }
        .search-input :global(button) {
          width: 20%;
          justify-content: center;
          cursor: pointer;
        }
        .search-input * {
          display: flex;
          border-radius: 0;
          font-size: 14px;
        }
        .search-input *[type='submit'] {
          border: none;
          padding: 10px;
          color: ${theme.color.white};
          background: ${theme.color.primary};
        }
        .search-input *[type='search'] {
          border: none;
          padding: 10px;
          margin-right: 5px;
        }
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
          margin: 40px;
          padding: 0;
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
        .header :global(.sidebar) {
          background: ${theme.color.black};
        }
        .header :global(.hamburger) {
          padding: 0;
          cursor: pointer;
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
    </header>
  )
}