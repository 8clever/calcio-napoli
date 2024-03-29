import { Container } from "./Grid";
import { Anchor, Button, Image, Lightbox, Sidebar } from "./Hybrid";
import { Search } from "./Icon";
import { media } from "./Media";
import { theme } from "./Theme";
import React from "react";
import { useAmp } from "next/amp";

export const Header = () => {
  const [ sidebar, setSidebar ] = React.useState(false);
  const [ lightbox, setLightbox ] = React.useState(false);
  const isAmp = useAmp();

  return (
    <header className="header">
      <Container>
        <div className="head">
          <Anchor
            style={{ 
              display: 'flex', 
              alignItems: 'center' 
            }}
            href="/">
            {
              isAmp ? null :
              <Image
                alt="Clacio Napoli"
                style={{
                  minWidth: 40
                }}
                width="40"
                height="40"
                src="/images/favicon.png"
              />
            }
            <span className="brand-text">
              Calcio Napoli
            </span>
          </Anchor>
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
                color: theme.pallete.background.text
              }}
              onClick={() => setLightbox(false)}
              on="tap:search-sidebar.close">X
            </Button>
          </div>
          <form className="search-form" method="GET" action="/search" target="_top">
            <label htmlFor="search">
              Ricerca nel sito
            </label>
            <div className="search-input">
              <input
                id="search" 
                type="search"
                placeholder="Testo..."
                name="q" 
                required 
              />
              <button 
                type="submit">
                Go
              </button>
            </div>
          </form>
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
                      <Anchor
                        ampOnly={i.standalone}
                        href={i.href}>
                        {i.label}
                      </Anchor>
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
          color: ${theme.pallete.background.text};
          cursor: pointer;
        }
        .search-form {
          margin-top: 60px;
        }
        .search-input *[type='search'] {
            width: 80%;
        }
        .search-input :global(button) {
          width: 20%;
          justify-content: center;
          cursor: pointer;
        }
        .search-input {
          display: flex;
        }
        .search-input * {
          border-radius: 0;
          font-size: 14px;
        }
        .search-input *[type='submit'] {
          border: none;
          padding: 10px;
          color: ${theme.pallete.primary.text};
          background: ${theme.pallete.primary.color};
        }
        .search-input *[type='search'] {
          border: none;
          padding: 10px;
          margin-right: 5px;
        }
        .header {
          background: ${theme.pallete.primary.color};
        }
        .header .head {
          min-height: 40px;
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
        .header .brand-text {
          color: ${theme.pallete.background.text};
          padding: 0px 15px;
          font-weight: bold;
          font-size: 20px;
        }
        .header :global(.sidebar) {
          background: ${theme.pallete.background.color};
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
          background-color: ${theme.pallete.background.text};
        }
      `}</style>
    </header>
  )
}