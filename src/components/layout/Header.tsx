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

interface Props {
    window?: () => Window;
}

const drawerWidth = 320;
const categoryItems = ['ABOUT', 'SHOP', 'WHOLESALE', 'SUBSCRIPTION', 'CONTACT'];
const userItems = ['LOGIN', 'CART'];

const HeaderBar = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, fontSize: 17 }}>
                Daydream Haven
            </Typography>
            <Divider />
            <List>
                {categoryItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'left' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {userItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'left' }}>
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
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: 'Merriweather',
                            fontWeight: 400,
                            fontSize: 20,
                            flexGrow: 1,
                            textAlign: 'center',
                            '@media (min-width: 900px)': {
                                textAlign: 'left',
                                fontSize: 25,
                            },
                            display: { sm: 'block' },
                        }}
                    >
                        Daydream Haven
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        {categoryItems.map((item) => (
                            <Button
                                key={item}
                                sx={{ color: '#503C3C', fontFamily: 'Merriweather', fontWeight: 300, fontSize: 14 }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {userItems.map((item) => (
                            <Button
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
