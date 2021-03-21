import IFrame from "iframe-resizer-react"
import React from "react";
interface IProps {
  src: string;
  taggedElement?: string;
}

// do not forget add src to proxy for avoid problems with CORS

export const ResponsiveIframe = (props: IProps) => {
  const id = "iframe";

  return (
    <>
      <div id={"loading-" + id}>
        Caricamento in corso...
      </div>
      <IFrame 
        log
        style={{
          width: "100%",
          height: 0,
          overflow: "hidden"
        }}
        frameBorder="no"
        heightCalculationMethod={
          props.taggedElement ?
          "taggedElement" :
          "bodyOffset"
        }
        id={id}
        scrolling={false}
        onLoad={async () => {
          const iframe = document.getElementById(id) as HTMLIFrameElement;
          const cw = iframe?.contentWindow || window;
          const url = "https://raw.githubusercontent.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js";
          const response = await fetch(url);
          const raw = await response.text();
          const script = document.createElement("script");
          if (props.taggedElement) {
            const awaitTag = async (): Promise<void> => {
              const tag = cw.document.body.querySelector(props.taggedElement as string);
              if (tag) {
                tag?.setAttribute("data-iframe-height", "true");
                return;
              };
              await new Promise(r => setTimeout(r, 100));
              return awaitTag();
            }
            await awaitTag();
          }
          document.getElementById("loading-" + id)?.remove();
          script.append(raw);
          cw.document.head.appendChild(script);
        }}
        src={props.src} 
      />
      <style jsx>{`
        #loading-${id} {
          padding: 20px;
        }
      `}</style>
    </>
  )
}