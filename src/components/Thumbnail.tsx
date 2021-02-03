import { useAmp } from "next/amp"
import { Anchor, Image } from "./Hybrid"

interface IProps {
  title: string;
  imageSrc: string;
  href: string;
}

export const Thumbanil = (props: IProps) => {
  const isAmp = useAmp();
  return (
    <Anchor href={props.href}>
      <div className="img-responsive">
        <Image
          alt={props.title}
          src={props.imageSrc}
        />
        <h3>{props.title}</h3>
      </div>
      <style jsx>{`
        .img-responsive {
          transition: all 0.3s;
          position: relative;
          ${
            isAmp ?
            "padding-top: 56%;" :
            ""
          }
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
    </Anchor>
  )
}