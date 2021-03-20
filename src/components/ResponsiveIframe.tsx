import IFrame from "iframe-resizer-react"

interface IProps {
  src: string;
  taggedElement?: string;
}

// do not forget add src to proxy for avoid problems with CORS

export const ResponsiveIframe = (props: IProps) => {
  return (
    <IFrame 
      log
      style={{
        width: "100%"
      }}
      frameBorder="no"
      heightCalculationMethod={
        props.taggedElement ?
        "taggedElement" :
        "bodyOffset"
      }
      id="sportradar"
      scrolling={false}
      onLoad={async () => {
        const iframe = document.querySelector("#sportradar") as HTMLIFrameElement;
        const cw = iframe?.contentWindow || window;
        const url = "https://raw.githubusercontent.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js";
        const response = await fetch(url);
        const raw = await response.text();
        const script = document.createElement("script");
        if (props.taggedElement) {
          const tag = cw.document.querySelector(props.taggedElement);
          tag?.setAttribute("data-iframe-height", "true");
        }
        script.append(raw);
        cw.document.head.appendChild(script);
      }}
      src={props.src} 
    />
  )
}