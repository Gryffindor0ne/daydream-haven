import Box from '@mui/material/Box';

const Home = () => {
    return (
        <Box>
            <Box
                sx={{
                    marginTop: 10,
                    maxWidth: '100%',
                    height: 'auto',
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/cafe-view.jpg" alt="cafe-view" />
            </Box>
            <Box
                sx={{
                    height: '10vh',
                }}
            ></Box>
            <Box
                sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    '@media (max-width: 900px)': {
                        width: '100vw',
                        height: '0vh',
                    },
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/coffee-drip.jpg" alt="coffee-drip" />
            </Box>
            <Box
                sx={{
                    height: '10vh',
                }}
            ></Box>
            <Box
                sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    '@media (max-width: 900px)': {
                        width: '100vw',
                        height: '0vh',
                    },

                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/coffee-roasting.jpg" alt="coffee-roasting" />
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
                    maxWidth: '100%',
                    height: 'auto',
                    '@media (max-width: 900px)': {
                        width: '100vw',
                        height: '0vh',
                    },
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                }}
            >
                <img src="src/assets/images/coffee-brewing.jpg" alt="coffee-brewing" />
            </Box>
            <Box
                sx={{
                    height: '0vh',
                    '@media (min-width: 900px)': {
                        height: '10vh',
                    },
                }}
            ></Box>
        </Box>
    );
};

export default Home;
