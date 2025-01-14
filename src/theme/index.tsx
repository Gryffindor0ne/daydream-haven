import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        footer: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        footer?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        footer: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#B67352',
        },
        secondary: {
            main: '#F0BB78',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        footer: {
            fontSize: '0.7rem',
        },
    },
    components: {
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
            defaultProps: {
                variantMapping: {
                    footer: 'h6',
                },
            },
            styleOverrides: {
                root: {
                    fontFamily: 'Merriweather',
                },
            },
        },
    },
});

export default theme;
