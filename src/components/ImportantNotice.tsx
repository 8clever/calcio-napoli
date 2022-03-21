import Link from "next/link";
import { Container } from "./Grid";
import { theme } from "./Theme";

export function ImportantNotice () {
  return (
    <div className="bg">
      <Container fluid>
        <Link href="/information">
          <a href="/information">
            Informazioni importanti
          </a>
        </Link>
      </Container>
      <style jsx>{`
        .bg {
          text-align: center;
          background: ${theme.pallete.danger.color};
          padding: 5px;
        }
        .bg a {
          color: ${theme.pallete.danger.text};
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}