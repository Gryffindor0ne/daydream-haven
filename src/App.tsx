import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/system/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '~/app/store';
import Router from '~/pages/Router';
import theme from '~/theme';

function App() {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router />
                </ThemeProvider>
            </Provider>
        </>
    );
}

export default App;
