import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9e8a78',
        },
        secondary: {
            main: 'rgba(30,30,30,1)'
        }
    },
    typography: {
        fontFamily: `'Inter', 'sans-serif'`,
    }
});

export default theme;