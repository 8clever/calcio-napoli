import { useAmp } from "next/amp";
import { AmpImg, AmpLightbox, AmpSidebar, AmpYoutube, Button as AmpButton } from "react-amphtml";
import React from "react";
import LazyLoad from "react-lazyload";
import Link from "next/link";
import { theme } from "./Theme";
import { Play } from "./Icon";
import styled from 'styled-components'
interface ImageProps {
  alt?: string;
  src: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties
}

export const Image = (props: ImageProps) => {
  const isAmp = useAmp();
  if (isAmp) {
    const layout = props.width ? "fixed" : "fill";
    return (
      <AmpImg 
        specName="default"
        layout={layout}
        {...props}
      />
    )
  }  

  const style: React.CSSProperties = {
    position: "relative",
    overflow: "hidden"
  }
  
  if (props.width) style.width = props.width + "px";
  if (props.height) style.height = props.height + "px";
  if (!props.width && !props.height) style.paddingTop = "56.2%";

  return (
    <div>
      <LazyLoad 
        style={style}
        offset={100} 
        once>
        <img
          style={{
            position: "absolute",
            width: "100%",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          {...props}
        />
      </LazyLoad>
    </div>
  )
}

interface SidebarProps {
  id?: string;
  children?: React.ReactNode
  className?: string;
  toggle: () => void;
  open: boolean;
}

const SidebarContainer = styled.div`
  & > .fade {
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s, z-index 0.3s 0.3s;
    background: black;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  &.visible > .fade {
    z-index: 101;
    opacity: 0.4;
    transition: opacity 0.3s;
  }
  & > div {
    transition: 0.3s all;
    z-index: 102;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    width: 0px;
    overflow: hidden;

    &[open] {
      width: 260px;
    }
  }
`

export const Sidebar = ({ children, toggle, ...props }: SidebarProps) => {
  const isAmp = useAmp();

  if (isAmp) {
    return (
      <AmpSidebar
        specName="default"
        class={props.className}
        id={props.id}
        layout="nodisplay" 
        side="right">
        {children}
      </AmpSidebar>
    )
  }

  return (
    <>
      <SidebarContainer className={props.open ? "visible" : ""}>
        <div 
          onClick={toggle}
          className="fade" 
        />
        <div {...props}>
          {children}
        </div>
      </SidebarContainer>
    </>
  )
}

interface ButtonProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  on?: string;
  onClick?: () => void;
  type?: "submit";
  style?: React.CSSProperties;
}

export const Button = ({ on, onClick, ...props }: ButtonProps) => {
  const isAmp = useAmp();

  if (isAmp) {
    return (
      <AmpButton 
        {...props}
        specName="default" 
        on={on}
      />
    )
  }
  
  return (
    <button 
      {...props} 
      onClick={onClick}
    />
  )
}

interface LightboxProps {
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  open?: boolean;
}

export const LightboxContainer =  styled.div`
  position: fixed;
  inset: 0;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s, z-index 0.3s 0.3s;

  &[open] {
    transition: opacity 0.3s;
    opacity: 1;
    z-index: 100;
  }
`;

export const Lightbox = ({ children, ...props }: LightboxProps) => {
  const isAmp = useAmp();

  if (isAmp) {
    return (
      <AmpLightbox
        role="main"
        tabindex="1"
        specName="default"
        layout="nodisplay"
        {...props}>
        {children}
      </AmpLightbox>
    )
  }

  return (
    <LightboxContainer {...props}>
      {children}
    </LightboxContainer>
  )
}

interface YoutubeProps {
  videoId: string;
  thumbnail?: string;
  width?: string;
  height?: string;
}

export const Youtube = ({ videoId, thumbnail, ...props }: YoutubeProps) => {
  const isAmp = useAmp();

  const [ play, setPlay ] = React.useState(false);

  React.useEffect(() => {
    setPlay(false);
  }, [ videoId ]);

  if (isAmp) {
    return (
      <AmpYoutube 
        {...{
          layout: "responsive",
          ...props
        } as any}
        data-videoid={videoId}
      />
    )
  }

  return (
    <>
      {
        play ?
        <div className='iframe-container'>
          <iframe 
            title="Calcio Napoli Podcasts"
            allowFullScreen
            allow="accelerometer; autoplay; playsinline; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`}
            frameBorder="0"
          />
        </div> :

        thumbnail ?
        <div className="preview-container">
          <Image
            alt="Youtube Video"
            src={thumbnail}
          />
          <div className="button-container">
            <button onClick={() => setPlay(true)}>
              <Play /> Giocare
            </button>
          </div>
        </div>
        :

        null
      }
      <style jsx>{`
        .preview-container {
          position: relative;
        }
        .preview-container .button-container {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
        }
        .preview-container button {
          display: flex;
          border: none;
          padding: 20px;
          background: ${theme.pallete.primary.color};
          color: ${theme.pallete.primary.text};
          transition: 0.3s all;
          font-weight: bold;
          font-size: 20px;
          border-radius: 25px;
          margin: auto;
          cursor: pointer;
        }
        .preview-container button:hover {
          color: ${theme.pallete.background.color};
          background: ${theme.pallete.background.text};
        }
        .preview-container :global(svg) {
          height: 22px;
          margin-right: 5px;
        }
        .iframe-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding-top: 56.25%;
        }
        .iframe-container > iframe {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

interface AnchorProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ampOnly?: boolean;
}

export const Anchor = ({ href, ampOnly, ...props }: AnchorProps) => {
  const isAmp = useAmp();
  
  return (
    <>
      {
        isAmp || ampOnly ?
        <a {...props} href={href}/> :
        <Link href={href}>
          <a 
            {...props} 
          />
        </Link>
      }
      <style jsx>{`
        a {
          text-decoration: none;
          color: ${theme.pallete.background.text};
        }
      `}</style>
    </>
  )
}