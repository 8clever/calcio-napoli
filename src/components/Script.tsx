import NextScript, { ScriptProps} from 'next/script';
import React from 'react';
import { Lazy } from '../modules/Lazy';

export const Script = (props: ScriptProps) => {
  const [ loaded, setLoaded ] = React.useState(false);
  React.useEffect(() => {
    Lazy.Register(() => {
      setLoaded(true);
    })
  }, []);
  if (loaded) {
    return (
      <NextScript 
        {...props}
      />
    )
  }
  return null;
}