import { AmpImg, AmpSidebar, Button } from "react-amphtml";

const menuItems = [
  {
    href: "/news",
    label: "News"
  }
]

export const Header = () => {
  return (
    <header>
      <div style={{
        display: "flex",
        alignItems: "center"
      }}>
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
      </div>
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
      <AmpSidebar 
        specName="default"
        id="header-sidebar" 
        layout="nodisplay" 
        side="right">
        <ul className="sidebar-list">
          <li>
            {
              menuItems.map(i => {
                return (
                  <a
                    href={i.href}>
                    {i.label}
                  </a>
                )
              })
            }
          </li>
        </ul>
      </AmpSidebar>
      <style jsx>{`
        header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0px 0px 15px #9eb2f7;
        }

        header .sidebar-list {
          min-width: 200px;
          padding: 40px;
          list-style: none;
          display: flex;
          flex-direction: column
        }

        header .sidebar-list a {
          text-decoration: none;
          padding: 8px
        }

        header .brand-text {
          color: blue;
          padding: 0px 15px;
          font-weight: bold;
          font-size: 20px;
        }

        header :global(.hamburger) {
          border: none;
          background-color: transparent;
          width: 40px;
          height: 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center
        }

        header :global(.hamburger) div {
          width: 25px;
          height: 3px;
          background-color: black;
        }
      `}</style>
    </header>
  )
}