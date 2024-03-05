import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

interface Props {
    window?: () => Window;
}

const drawerWidth = 320;
const categoryItems = ['ABOUT', 'SHOP', 'WHOLESALE', 'SUBSCRIPTION', 'CONTACT'];
const userItems = ['LOGIN', 'CART'];

const HeaderBar = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navigate = useNavigate();
    const handleHomeButtonClick = () => navigate(`/`);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

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
                        <ListItemButton onClick={() => navigate(`/${item.toLowerCase()}`)} sx={{ textAlign: 'left' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {userItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton onClick={() => navigate(`/${item.toLowerCase()}`)} sx={{ textAlign: 'left' }}>
                            <ListItemText primary={item} />
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
                    paddingY: 1,
                    backgroundColor: '#ffffff',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' }, color: '#191919' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        onClick={handleHomeButtonClick}
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: 'Fraunces',
                            fontWeight: 700,
                            fontSize: 28,
                            flexGrow: 1,
                            textAlign: 'center',
                            '@media (min-width: 900px)': {
                                textAlign: 'left',
                                fontSize: 29,
                            },
                            display: { sm: 'block' },
                            cursor: 'pointer',
                            color: '#191919',
                        }}
                    >
                        Daydream Haven
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        {categoryItems.map((item) => (
                            <Button
                                onClick={() => navigate(`/${item.toLowerCase()}`)}
                                key={item}
                                sx={{ color: '#503C3C', fontFamily: 'Merriweather', fontWeight: 300, fontSize: 14 }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {userItems.map((item) => (
                            <Button
                                onClick={() => navigate(`/${item.toLowerCase()}`)}
                                key={item}
                                sx={{
                                    color: '#503C3C',
                                    fontFamily: 'Merriweather',
                                    fontWeight: 300,
                                    fontSize: 10,
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
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
                        display: { sm: 'block', md: 'none' },
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
