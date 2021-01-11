import { A, AmpImg, AmpSidebar, Button } from "react-amphtml";

const menuItems = [
  {
    href: "/news",
    label: "News"
  }
]

export const Header = () => {
  return (
    <>
      <header style={{
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 0px 15px #9eb2f7"
      }}>
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
          <span style={{
            color: "blue",
            padding: "0px 15px",
            fontWeight: "bold",
            fontSize: "20px"
          }}>
            Calcio Napoli
          </span>
        </div>
        <div>
          <Button 
            style={{
              border: "none",
              backgroundColor: "transparent",
              width: 40,
              height: 26,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center"
            }}
            specName="default" 
            on="tap:header-sidebar.toggle">
            {
              [1,2,3].map((_,idx) => {
                return (
                  <div 
                    style={{
                      width: 25,
                      height: 3,
                      backgroundColor: "black"
                    }}
                    key={idx}
                  />
                )
              })
            }
          </Button>
        </div>
        <AmpSidebar 
          specName="default"
          id="header-sidebar" 
          layout="nodisplay" 
          side="right">
          <ul style={{
            minWidth: 200,
            padding: 40,
            listStyle: "none",
            display: "flex",
            flexDirection: "column"
          }}>
            <li>
              {
                menuItems.map(i => {
                  return (
                    <A
                      style={{
                        textDecoration: "none",
                        padding: 8
                      }}
                      specName="default"
                      href={i.href}>
                      {i.label}
                    </A>
                  )
                })
              }
            </li>
          </ul>
        </AmpSidebar>
      </header>
      <style jsx>{`
      `}</style>
    </>
  )
}