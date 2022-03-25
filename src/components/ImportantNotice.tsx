import Link from "next/link";
import { theme } from "./Theme";

export function ImportantNotice () {
  return (
    <>
      <Link href="/information">
        <a>
          <div className="info">
            Supportaci
          </div>
        </a>
      </Link>
      <style jsx>{`
        .info {
          cursor: pointer;
          padding: 10px;
          text-align: center;
          background: ${theme.pallete.primary.lighten};
          color: ${theme.pallete.primary.text};
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </>
  )
}