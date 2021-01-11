
const items = [
  {
    href: "/",
    label: "Home"
  },
  {
    href: "/news",
    label: "News"
  }
]

export const Footer = () => {
  return (
    <>
      <footer style={{
        backgroundColor: "#779ecb",
        padding: "50px 15px"
      }}>
        <ul style={{
          display: "flex",
          flexDirection: "column",
        }}>
          {items.map(i => {
            return (
              <a 
                style={{
                  textDecoration: "none",
                  padding: 8
                }}
                key={i.href}
                href={i.href}>
                {i.label}
              </a>
            )
          })}
        </ul>
      </footer>
      <style jsx>{`
      `}</style>
    </>
  )
}