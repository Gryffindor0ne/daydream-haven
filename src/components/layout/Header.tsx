import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Badge } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

import { categoryItems } from '~/utils/constants';
import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { authState, setLoading } from '~/features/auth/authSlice';
import { cartState } from '~/features/cart/cartSlice';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

interface Props {
    window?: () => Window;
}

const drawerWidth = 320;

const HeaderBar = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const { isMobile, isBrower } = useResponsiveLayout();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(authState);

    const userItems = [isAuthenticated ? 'MY PAGE' : '', isAuthenticated ? 'LOGOUT' : 'LOGIN'];
    const handleHomeButtonClick = () => navigate(`/`);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const currentLocation = useLocation();
    const { cartItems } = useAppSelector(cartState);
    const cartItemCount = cartItems.length;

    const handleClick = useCallback(() => {
        const currentPath = location.pathname;
        const redirectTo = isAuthenticated ? '/mypage' : '/login';

        if (currentPath !== redirectTo) {
            dispatch(setLoading(true));

            navigate(redirectTo, {
                state: {
                    redirectedFrom: isAuthenticated ? '/' : '/mypage',
                },
            });
            dispatch(setLoading(false));
        }
    }, [dispatch, isAuthenticated, navigate]);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography
                onClick={handleHomeButtonClick}
                variant="h6"
                sx={{ my: 2, fontFamily: 'Fraunces', fontWeight: 700, fontSize: 25, cursor: 'pointer' }}
            >
                Daydream Haven
            </Typography>
            <Divider />
            <List>
                {categoryItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton
                            onClick={() =>
                                navigate(`/${item.toLowerCase()}`, {
                                    state: { redirectedFrom: currentLocation },
                                })
                            }
                            sx={{ textAlign: 'left' }}
                        >
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {userItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (item === 'LOGOUT') {
                                    dispatch({ type: 'auth/logoutUser' });
                                    navigate(`/`);
                                } else if (item === 'MY PAGE') {
                                    navigate(`/mypage`, {
                                        state: { redirectedFrom: currentLocation },
                                    });
                                } else {
                                    navigate(`/${item.toLowerCase()}`, {
                                        state: { redirectedFrom: currentLocation },
                                    });
                                }
                            }}
                            sx={{ textAlign: 'left' }}
                        >
                            <ListItemText
                                primary={item}
                                primaryTypographyProps={{
                                    fontSize: 13,
                                    fontWeight: 200,
                                    color: '#503C3C',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                component="nav"
                sx={{
                    boxShadow: 1,
                    py: 1.5,
                    backgroundColor: '#ffffff',
                }}
            >
                <Toolbar>
                    <Typography
                        onClick={handleHomeButtonClick}
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: 'Fraunces',
                            fontWeight: 700,
                            fontSize: isBrower ? 27 : 20,
                            width: '20rem',
                            textAlign: 'left',
                            display: { sm: 'block' },
                            cursor: 'pointer',
                            color: '#191919',
                        }}
                    >
                        Daydream Haven
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 20,
                            display: { xs: 'none', lg: 'flex' },
                            justifyContent: 'center',
                        }}
                    >
                        {categoryItems.map((item) => (
                            <Button
                                onClick={() =>
                                    navigate(`/${item.toLowerCase()}`, {
                                        state: { redirectedFrom: currentLocation },
                                    })
                                }
                                key={item}
                                sx={{
                                    color: '#503C3C',
                                    fontFamily: 'Merriweather',
                                    fontWeight: 300,
                                    fontSize: 18,
                                    mx: 4,
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ width: isBrower ? '20rem' : isMobile ? '10rem' : '45rem', textAlign: 'right' }}>
                        <IconButton
                            onClick={handleClick}
                            sx={{
                                color: '#503C3C',
                                width: 40, // 버튼의 너비 설정
                                height: 40, // 버튼의 높이 설정
                                '& .MuiSvgIcon-root': {
                                    fontSize: 30, // 아이콘의 크기 설정
                                },
                            }}
                        >
                            <PermIdentityOutlinedIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => navigate('/cart', { state: { redirectedFrom: currentLocation } })}
                            sx={{
                                color: '#503C3C',
                                width: 40, // 버튼의 너비 설정
                                height: 40, // 버튼의 높이 설정
                                '& .MuiSvgIcon-root': {
                                    fontSize: 26, // 아이콘의 크기 설정
                                },
                                mr: 2,
                            }}
                        >
                            <Badge badgeContent={cartItemCount} color="error">
                                <LocalMallOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { lg: 'none' }, color: '#191919' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { sm: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
};
export default HeaderBar;
