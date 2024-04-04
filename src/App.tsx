import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/system/ThemeProvider';
import { useEffect } from 'react';
import { useAppDispatch } from '~/app/reduxHooks';
import Router from '~/pages/Router';
import theme from '~/theme';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: 'auth/checkTokenExpiration' });
    }, [dispatch]);

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
