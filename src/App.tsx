import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/system/ThemeProvider';

import { useAppDispatch } from '~/app/reduxHooks';
import LoadingIndicator from '~/components/LoadingIndicator';
import Router from '~/pages/Router';
import theme from '~/theme';
import Footer from '~/components/layout/Footer';
import HeaderBar from '~/components/layout/Header';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: 'auth/checkTokenExpiration' });
    }, [dispatch]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HeaderBar />
                <LoadingIndicator />
                <Router />
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default App;
