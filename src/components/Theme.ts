
interface Color {
  color: string;
  text: string;
  lighten?: string;
  darken?: string;
}

interface Theme {
  pallete: {
    primary: Color;
    warning: Color;
    danger: Color;
    background: Color;
  }
}

const white = "#f8fdfe";
const black = "#222627";

export const theme: Theme = {
  pallete: {
    primary: {
      color: "#2651a5",
      lighten: "#3c69c1",
      text: white
    },
    warning: {
      color: "#ffc107",
      text: black
    },
    danger: {
      color: "#dc3545",
      text: white
    },
    background: {
      color: black,
      text: white
    }
  }
}