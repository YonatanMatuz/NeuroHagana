import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';
import interceptorService from './Services/InterceptorService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interceptorService.create();

let theme = createTheme({
  typography: {
    body2: {
      fontSize : '1.1rem',
      lineHeight: 1.3,
    },
    subtitle1: {
      fontSize : '1.1rem',
      lineHeight: 1.75,
      textAlign: 'center',
      color: '#000', 
    }
  },
  palette: {
    secondary: {
      main: 'rgba(255,255,255,0.85)',
    },
    info: {
      main: '#c7ddef'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255,255,255,0.85)',
          marginTop: '11.4px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.1rem',
        },
      },
    },
  },
});

theme.typography.h2 = {
  [theme.breakpoints.up('xs')]: {
    fontSize: '1rem',
    fontWeight: 300,
    color: '#262262',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.4rem',
    fontWeight: 300,
    color: '#262262',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
    fontWeight: 300,
    color: '#262262',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.8rem',
    fontWeight: 300,
    color: '#262262', 
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '2.2rem',
    fontWeight: 200,
    color: '#262262',
  },
}

theme.typography.body1 = {
  [theme.breakpoints.up('xs')]: {
    fontSize: '0.7rem',
    lineHeight: 1.3,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
    lineHeight: 1.3,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.2rem',
    lineHeight: 1.5,
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '1.2rem',
    lineHeight: 1.5,
  },
}

theme.typography.caption = {
  [theme.breakpoints.up('xs')]: {
    fontSize: '0.6rem',
    verticalAlign: 'auto'
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.1rem',
    lineHeight: 1.5,
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '1rem',
    verticalAlign: 'auto',
  },
}

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ThemeProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
