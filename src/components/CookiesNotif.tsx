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
            Use this web site you aggree with that this site uses cookies for Google Adsense and Google Analytics.
          </Col>
          <Col md={2}>
            <div 
              onClick={() => {
                document.cookie = key;
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
          position: fixed;
          background: #18a1c3;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20px 20px 5px 20px;
        }
        .cookies .button {
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
          padding: 10px;
          background: ${theme.color.primary};
        }
      `}</style>
    </div>
  )
}