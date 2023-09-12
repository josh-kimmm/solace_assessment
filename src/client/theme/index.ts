import { createTheme } from '@mui/material';

const MainTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          height: "100vh",
        }
      }
    }
  }
});

export default MainTheme;