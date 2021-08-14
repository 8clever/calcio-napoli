import NextScript, { ScriptProps} from 'next/script';
import React from 'react';

let LOADED = false;

export const Script = (props: ScriptProps) => {
  const [ loaded, setLoaded ] = React.useState(LOADED);
  React.useEffect(() => {
    setTimeout(() => {
      LOADED = true;
      setLoaded(true);
    }, 3000);
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