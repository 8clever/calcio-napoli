import { useAmp } from "next/amp";
import { AmpImg, AmpLightbox, AmpSidebar, AmpYoutube, Button as AmpButton } from "react-amphtml";
import React from "react";
import LazyLoad from "react-lazyload";

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
  return (
    <LazyLoad height={props.height || 200} offset={100} once>
      <img
        style={{
          minHeight: props.height || 120,
          width: "100%",
          height: "auto"
        }}
        {...props}
      />
    </LazyLoad>
  )
}

interface SidebarProps {
  id?: string;
  children?: React.ReactNode
  className?: string;
  toggle: () => void;
  open: boolean;
}

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
    <div className={`sidebar-container ${props.open ? "visible" : ""}`}>
      <div 
        onClick={toggle}
        className="fade" 
      />
      <div {...props}>
        {children}
      </div>
      <style jsx>{`
        .sidebar-container .fade {
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
        .sidebar-container.visible .fade {
          z-index: 1;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .sidebar-container > div {
          transition: 0.3s all;
          z-index: 2;
          position: fixed;
          right: 0;
          bottom: 0;
          top: 0;
          width: 0px;
          overflow: hidden;
        }
        .sidebar-container > div[open] {
          width: 260px;
        }
      `}</style>
    </div>
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
    <div {...props}>
      {children}
      <style jsx>{`
        div {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s, z-index 0.3s 0.3s; 
        }
        div[open] {
          transition: opacity 0.3s;
          opacity: 1;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}

interface YoutubeProps {
  videoId: string;
  width?: string;
  height?: string;
}

export const Youtube = ({ videoId, ...props }: YoutubeProps) => {
  const isAmp = useAmp();

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
    <div>
      <iframe 
        title="Calcio Napoli Podcasts"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
      />
      <style jsx>{`
        div {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding-top: 56.25%;
        }
        iframe {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}