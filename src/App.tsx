import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/system/ThemeProvider';
import Router from '~/pages/Router';
import theme from '~/theme';

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
            </ThemeProvider>
        </>
    );
}

export default App;
