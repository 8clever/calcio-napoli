import { menuItems } from "./Header"
import { theme } from "./Theme";

const items = menuItems;

export const Footer = () => {
  return (
    <>
      <footer>
        <ul>
          {items.map(i => {
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
      </footer>
      <style jsx>{`
        footer {
          background: ${theme.color.primary};
          padding: 50px 15px;
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