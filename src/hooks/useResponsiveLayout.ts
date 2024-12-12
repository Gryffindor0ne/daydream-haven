import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsiveLayout = () => {
    const theme = useTheme();
    const isBrower = useMediaQuery(theme.breakpoints.up('lg'));
    const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));

    return {
        isBrower,
        isTabletOrMobile,
        isMobile,
        isTablet,
    };
};

export default useResponsiveLayout;
