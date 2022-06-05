import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import CategoryIcon from '@mui/icons-material/Category';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecommendTwoToneIcon from '@mui/icons-material/RecommendTwoTone';
import ProductionQuantityLimitsTwoToneIcon from '@mui/icons-material/ProductionQuantityLimitsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';


// stables
import CategoryUi from "./CategoryUi";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Category

            </Typography>
            <IconButton onClick={() => {
              localStorage.removeItem('userinfo')
              navigate('/')
            }} color="inherit">
              <Badge color="warning">
                <LogoutIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* Dashboard */}
            <ListItemButton onClick={() => { navigate("/dashboard") }}>
              <ListItemIcon>
                <DashboardIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            {/* order */}
            <ListItemButton onClick={() => { navigate("/orders") }}>
              <ListItemIcon>
                <ShoppingCartIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>

            {/* Users  */}
            <ListItemButton onClick={() => { navigate("/users") }}>
              <ListItemIcon>
                <AccountCircleTwoToneIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton onClick={() => { navigate("/category") }}>
              <ListItemIcon>
                <CategoryIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItemButton>

            {/* Products  */}
            <ListItemButton onClick={() => { navigate("/products") }}>
              <ListItemIcon>
                <ProductionQuantityLimitsTwoToneIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>

            {/* Recomended  */}
            <ListItemButton onClick={() => { navigate("/recomended") }}>
              <ListItemIcon>
                <RecommendTwoToneIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Recomended" />
            </ListItemButton>

            {/* Recent  */}
            <ListItemButton onClick={() => { navigate("/recent") }}>
              <ListItemIcon>
                <DashboardIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Recent" />
            </ListItemButton>

             {/* Add Product */}
             <ListItemButton onClick={() => { navigate("/addproduct") }}>
              <ListItemIcon>
                <AddCircleIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItemButton>



            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <CategoryUi />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Product() {
  return <DashboardContent />;
}