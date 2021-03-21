import IFrame, { IframeResizerProps } from "iframe-resizer-react"
import React from "react";

const awaitTag = async (els: string[], cw: Window): Promise<void> => {
  for (const el of els) {
    const tag = cw.document.body.querySelector(el as string) as HTMLDivElement;
    if (tag) {
      const rect = tag.getBoundingClientRect();
      if (rect.height) {
        tag.setAttribute("data-iframe-height", "true");
        return;
      }
    };
  }
  await new Promise(r => setTimeout(r, 100));
  return awaitTag(els, cw);
}
interface IProps extends Partial<IframeResizerProps> {
  src: string;
  taggedElement?: string | string[];
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
          const style = document.createElement("style");
          style.innerHTML = "* { overflow: hidden !important }";
          cw.document.body.appendChild(style);
          if (props.taggedElement) {
            const els = Array.isArray(props.taggedElement) ? props.taggedElement : [props.taggedElement];
            await awaitTag(els, cw);
          }
          document.getElementById("loading-" + id)?.remove();
          script.append(raw);
          cw.document.head.appendChild(script);
        }}
        {...props}
      />
      <style jsx>{`
        #loading-${id} {
          padding: 20px;
        }
      `}</style>
    </>
  )
}