import { createTheme } from '@mui/material';
const breakpoints = {
  values: {
    xs: 0,
    sm: 0, // Phone
    md: 768, // Tablet/Laptop
    lg: 1500, // Desktop
    xl: 2000,
  },
};
export const Colors = {
  primary: '#e9ebec',
  secondary: '#2b2625',

  tertiary: '#e86856',
  quaternary: '#00aa7a',
  quinary: '#afcf63',
  senary: '#6B797A',
  septenary: '#84634B',
  octonary: '#302839',
  // primary: '#080808',
  //secondary: '#d1adcc',
  success: '#4CAF50',
  info: '#00a2ff',
  danger: '#b90802',
  warning: '#FFC107',
  dark: '#0e1b20',
  light: '#aaa',
  muted: '#abafb3',
  border: '#DDDFE1',
  inverse: '#2F3D4A',
  shaft: '#333',
  ///////////////
  // Grays
  ///////////////
  dim_grey: '#696969',
  dove_gray: '#e8e8e8',
  body_bg: '#f3f6f9',
  light_gray: 'rgb(230,230,230)',
  ///////////////
  // Solid Color
  ///////////////
  white: '#fff',
  black: '#000',
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },

  typography: {

    fontFamily: 'Oxygen, sans-serif',
    fontSize: 16,
    h4: {
      fontSize: 26,

      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:300px)': {
        fontSize: '2.7rem',
      },
      '@media (max-width:1200px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: 23,
      '@media (min-width:1200px)': {
        fontSize: '1.5rem',
      },
    },
    h1: {
      fontSize: 28,
      padding: 0,
      fontWeight: 'bold',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:300px)': {
        fontSize: '2.7rem',
      },
      '@media (max-width:1200px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: 28,
      padding: 0,
      fontWeight: 'bold',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width:300px)': {
        fontSize: '3.7rem',
      },
      '@media (max-width:1200px)': {
        fontSize: '3.5rem',
      },
    },

    h6: {
      fontSize: 20,
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:300px)': {
        fontSize: '1.2rem',
      },
      '@media (max-width:1200px)': {
        fontSize: '0.8rem',
      },
    },
    body: {
      fontSize: 18,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:300px)': {
        fontSize: '0.9rem',
      },
      '@media (max-width:1200px)': {
        fontSize: '0.5rem',
      },
    },
    listItem: {
      fontSize: 18,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:300px)': {
        fontSize: '1.1rem',
      },
      '@media (max-width:1200px)': {
        fontSize: '1.1rem',
      },
    },
    drawerWidth: {
      width: '50%',
      color: Colors.body_bg,
      '@media (min-width: 300px)': {
        width: '30%',
      },
    },
    button: {
      fontSize: 18,
      fontWeight: 'bold',
      '@media (min-width:600px)': {
        fontSize: '1.0rem',
      },
      '@media (min-width:300px)': {
        fontSize: '1.1rem',
      },
      '@media (max-width:1200px)': {
        fontSize: '0.8rem',
      },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
});

export default theme;
