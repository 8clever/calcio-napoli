import React from 'react';

export const CodeBlock = (props: { children: React.ReactNode }) => {
  return (
    <div style={{
      padding: 5,
      background: 'rgba(0,0,0,0.1)',
      borderRadius: 4,
      marginBottom: 5
    }}>
      <small>{props.children}</small>
    </div>
  )
}