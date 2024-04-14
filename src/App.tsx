import { useEffect } from 'react';

import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/system/ThemeProvider';

import { useAppDispatch } from '~/app/reduxHooks';
import Router from '~/pages/Router';
import theme from '~/theme';
import HeaderBar from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import LoadingIndicator from '~/components/common/LoadingIndicator';

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
