import React from "react";
import { Col, Container, Row } from "./Grid";
import { theme } from "./Theme";

const key = "calcioNapoliCookies=true";

export const CookiesNotif = () => {

  const [ visible, setVisible ] = React.useState(false);

  React.useEffect(() => {
    if (document.cookie.includes(key)) return;
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="cookies">
      <Container>
        <Row>
          <Col md={10}>
            This web site uses cookies for Google Adsense and Google Analytics.
          </Col>
          <Col md={2}>
            <div 
              onClick={() => {
                document.cookie = `${key}; path=/; max-age=31536000`;
                setVisible(false);
              }}
              className="button">
              Got It!
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .cookies {
          border-top: 2px solid ${theme.pallete.background.color};
          position: fixed;
          background: ${theme.pallete.primary.color};
          left: 0;
          right: 0;
          bottom: 0;
          padding: 15px;
          padding-bottom: 0;
        }
        .cookies :global(.col-10) {
          display: flex;
          align-items: center;
          font-size: 18px;
        }
        .cookies .button {
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
          padding: 10px;
          background: ${theme.pallete.background.color};
        }
      `}</style>
    </div>
  )
}