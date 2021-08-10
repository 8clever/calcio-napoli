import { Col, Container, Row } from "./Grid";
import { Anchor } from "./Hybrid";
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
                          <Anchor
                            ampOnly={i.standalone}
                            href={i.href}>
                            {i.label}
                          </Anchor>
                        </li>
                      )
                    })}
                  </ul>
                </Col>
              )
            })}
          </Row>
          <small>v1.0.8</small>
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
      `}</style>
    </>
  )
}