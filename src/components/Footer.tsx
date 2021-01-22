import { Col, Container, Row } from "./Grid";
import { media } from "./Media";
import { theme } from "./Theme";

export const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Row>
            {[ media.menu, media.media, media.partners ].map((list, idx) => {
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
          padding-top: 15px;
          background: ${theme.color.primary};
        }
        footer ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        footer ul li {
          padding: 8px 0;
        }
        footer ul a {
          text-decoration: none;
          color: ${theme.color.white};
        }
      `}</style>
    </>
  )
}