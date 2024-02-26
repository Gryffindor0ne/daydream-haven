import Box from '@mui/material/Box';
import Footer from '~/components/layout/Footer';
import HeaderBar from '~/components/layout/Header';

const Home = () => {
    return (
        <Box>
            <HeaderBar />
            <Box
                sx={{
                    marginTop: 10,
                    height: '30vh',
                    '@media (min-width: 600px)': {
                        width: '100vw',
                        height: '45vh',
                    },
                    '@media (min-width: 900px)': {
                        width: '100vw',
                        height: '40vh',
                    },
                    '@media (min-width: 1100px)': {
                        width: '100vw',
                        height: '50vh',
                    },
                    '@media (min-width: 1400px)': {
                        width: '100vw',
                        height: '60vh',
                    },
                    '@media (min-width: 1600px)': {
                        width: '100vw',
                        height: '80vh',
                    },
                    '@media (min-width: 1800px)': {
                        width: '100vw',
                        height: '100vh',
                    },
                    '& img': {
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/cafe-view.jpg" width="100%" height="100%" alt="cafe-view" />
            </Box>
            <Box
                sx={{
                    height: '10vh',
                }}
            ></Box>
            <Box
                sx={{
                    height: '0vh',
                    '@media (min-width: 900px)': {
                        width: '100vw',
                        height: '40vh',
                    },
                    '@media (min-width: 1100px)': {
                        width: '100vw',
                        height: '50vh',
                    },
                    '@media (min-width: 1400px)': {
                        width: '100vw',
                        height: '60vh',
                    },
                    '@media (min-width: 1600px)': {
                        width: '100vw',
                        height: '80vh',
                    },
                    '@media (min-width: 1800px)': {
                        width: '100vw',
                        height: '90vh',
                    },
                    '& img': {
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/coffee-drip.jpg" width="100%" height="100%" alt="coffee-drip" />
            </Box>
            <Box
                sx={{
                    height: '10vh',
                }}
            ></Box>
            <Box
                sx={{
                    height: '0vh',
                    '@media (min-width: 900px)': {
                        width: '100vw',
                        height: '40vh',
                    },
                    '@media (min-width: 1100px)': {
                        width: '100vw',
                        height: '50vh',
                    },
                    '@media (min-width: 1400px)': {
                        width: '100vw',
                        height: '60vh',
                    },
                    '@media (min-width: 1600px)': {
                        width: '100vw',
                        height: '80vh',
                    },
                    '@media (min-width: 1800px)': {
                        width: '100vw',
                        height: '90vh',
                    },
                    '& img': {
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/coffee-roasting.jpg" width="100%" height="100%" alt="coffee-roasting" />
            </Box>
            <Box
                sx={{
                    height: '0vh',
                    '@media (min-width: 900px)': {
                        height: '10vh',
                    },
                }}
            ></Box>
            <Box
                sx={{
                    height: '0vh',
                    '@media (min-width: 900px)': {
                        width: '100vw',
                        height: '40vh',
                    },
                    '@media (min-width: 1100px)': {
                        width: '100vw',
                        height: '50vh',
                    },
                    '@media (min-width: 1400px)': {
                        width: '100vw',
                        height: '60vh',
                    },
                    '@media (min-width: 1600px)': {
                        width: '100vw',
                        height: '80vh',
                    },
                    '@media (min-width: 1800px)': {
                        width: '100vw',
                        height: '90vh',
                    },
                    '& img': {
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/coffee-brewing.jpg" width="100%" height="100%" alt="coffee-brewing" />
            </Box>
            <Box
                sx={{
                    height: '0vh',
                    '@media (min-width: 900px)': {
                        height: '10vh',
                    },
                }}
            ></Box>
            <Footer />
        </Box>
    );
};

export default Home;
