import { Col, Container, Row } from "./Grid";
import { menuItems } from "./Header"
import { theme } from "./Theme";

const items = menuItems;

const channels = [
  {
    href: "",
    label: "YouTube"
  },
  {
    href: "",
    label: "FaceBook"
  },
  {
    href: "",
    label: "Twitter"
  }
]

export const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Row>
            {[ items, channels, [] ].map((list, idx) => {
              return (
                <Col md={4} key={idx}>
                  <ul>
                    {list.map(i => {
                      return (
                        <li key={i.href}>
                          <a 
                            href={i.href}>
                            {i.label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </Col>
              )
            })}
          </Row>
        </Container>
      </footer>
      <style jsx>{`
        footer {
          background: ${theme.color.primary};
        }
        footer ul {
          list-style: none;
        }
        footer ul li {
          padding: 8px;
        }
        footer ul a {
          text-decoration: none;
          padding: 8;
          color: ${theme.color.white};
        }
      `}</style>
    </>
  )
}