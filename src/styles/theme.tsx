import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4ADE80" }, // Verde
    secondary: { main: "#FFA580" }, // Naranja
    error: { main: "#FF4151" }, // Rojo
    background: {
      default: "#F9FAFB",
      paper: "#FFF",
    },
    text: {
      primary: "#2D2D2D",
      secondary: "#6B7280",
    },
    info: { main: "#4ADE80" },
  },
  shape: { borderRadius: 18 },
});
export default theme;
