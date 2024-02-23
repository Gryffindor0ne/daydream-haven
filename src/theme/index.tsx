import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                    '&:hover': {
                        color: '#C7C8CC',
                        background: '#ffffff',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Merriweather',
                    fontWeight: 300,
                    fontSize: 13,
                },
            },
        },
    },
});

export default theme;
