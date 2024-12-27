import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

// 원(circle) 애니메이션 정의
const circleAnimation = keyframes`
  0% {
    top: 20px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 10px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
`;

// 그림자(shadow) 애니메이션 정의
const shadowAnimation = keyframes`
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: .7;
  }
  100% {
    transform: scaleX(.2);
    opacity: .4;
  }
`;

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                width: '150px',
                position: 'relative',
            }}
        >
            <Box sx={{ position: 'relative', width: '80px', height: '30px' }}>
                {/* Circles */}
                <Box
                    sx={{
                        width: '10px',
                        height: '10px',
                        position: 'absolute',
                        borderRadius: '50%',
                        backgroundColor: '#B67352',
                        left: '0%',
                        transformOrigin: '50%',
                        animation: `${circleAnimation} .5s alternate infinite ease`,
                    }}
                />
                <Box
                    sx={{
                        width: '10px',
                        height: '10px',
                        position: 'absolute',
                        borderRadius: '50%',
                        backgroundColor: '#B67352',
                        left: '40%',
                        transformOrigin: '50%',
                        animation: `${circleAnimation} .5s alternate infinite ease`,
                        animationDelay: '.2s',
                    }}
                />
                <Box
                    sx={{
                        width: '10px',
                        height: '10px',
                        position: 'absolute',
                        borderRadius: '50%',
                        backgroundColor: '#B67352',
                        right: '0%',
                        transformOrigin: '50%',
                        animation: `${circleAnimation} .5s alternate infinite ease`,
                        animationDelay: '.3s',
                    }}
                />
                {/* Shadows */}
                <Box
                    sx={{
                        width: '10px',
                        height: '2px',
                        borderRadius: '50%',
                        backgroundColor: '#B67352',
                        position: 'absolute',
                        top: '22px',
                        transformOrigin: '50%',
                        zIndex: -1,
                        left: '0%',
                        filter: 'blur(1px)',
                        animation: `${shadowAnimation} .5s alternate infinite ease`,
                    }}
                />
                <Box
                    sx={{
                        width: '10px',
                        height: '2px',
                        borderRadius: '50%',
                        backgroundColor: '#B67352',
                        position: 'absolute',
                        top: '22px',
                        transformOrigin: '50%',
                        zIndex: -1,
                        left: '40%',
                        filter: 'blur(1px)',
                        animation: `${shadowAnimation} .5s alternate infinite ease`,
                        animationDelay: '.2s',
                    }}
                />
                <Box
                    sx={{
                        width: '10px',
                        height: '2px',
                        borderRadius: '50%',
                        backgroundColor: '#B67352',
                        position: 'absolute',
                        top: '22px',
                        transformOrigin: '50%',
                        zIndex: -1,
                        right: '0%',
                        filter: 'blur(1px)',
                        animation: `${shadowAnimation} .5s alternate infinite ease`,
                        animationDelay: '.3s',
                    }}
                />
                {/* Loading Text */}
                <Typography
                    sx={{
                        position: 'absolute',
                        top: '30px',
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '12px',
                        letterSpacing: '4px',
                        color: '#000',
                        left: '0%',
                        right: '0%',
                        textAlign: 'center',
                    }}
                >
                    Loading
                </Typography>
            </Box>
        </Box>
    );
};

export default LoadingSpinner;
