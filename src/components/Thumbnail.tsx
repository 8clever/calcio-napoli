import { AmpImg } from "react-amphtml"
import { theme } from "./Theme"

interface IProps {
  title: string;
  imageSrc: string;
  href: string;
}

export const Thumbanil = (props: IProps) => {
  return (
    <a href={props.href}>
      <div className="img-responsive">
        <AmpImg 
          alt={props.title}
          specName="default"
          src={props.imageSrc}
          layout="fill"
        />
        <h3>{props.title}</h3>
      </div>
      <style jsx>{`
        a {
          color: ${theme.color.white};
          text-decoration: none;
        }
        .img-responsive {
          transition: all 0.3s;
          position: relative;
          padding-top: 56%;
          overflow: hidden;
        }
        .img-responsive :global(amp-img) {
        }
        .img-responsive:hover {
          transform: scale(1.03);
        }
        .img-responsive h3 {
          margin: 0;
          padding: 5px;
          background: rgba(0,0,0,0.5);
          position: absolute;
          left: 0;
          bottom: 0;
        }  
      `}</style>
    </a>
  )
}