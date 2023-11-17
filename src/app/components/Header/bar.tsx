import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import { useRequestCardContext } from '@/app/contexts/cardContrext';
import { CartServices } from '../Home/Cart/services';
import { useClientContext } from '@/app/contexts/clientContext';
import { useUser } from '@clerk/nextjs';
import { Badge, createTheme } from '@mui/material';
import { BiShoppingBag } from 'react-icons/bi';
import Link from 'next/link';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { linksObj } from '@/app/links';
import { PiContactlessPayment } from 'react-icons/pi';
import { ThemeProvider } from '@emotion/react';
import ClientUser from '../client/client';

function ResponsiveAppBar() {
  const {setStateShow,ListOrder} = useRequestCardContext()
   const {getInvoice,getClientActive} = CartServices()
   const {client,setClient} = useClientContext()
   const { isSignedIn, user, isLoaded } = useUser();
   if (!isLoaded) {
     return null;
   }
   React.useEffect(()=>{
     (async()=>{
       if (isSignedIn) {
         const token = localStorage.getItem('clerk-db-jwt') || null
         client.name = user.fullName
         client.email = user.emailAddresses[0].emailAddress
         client.surname = user.firstName
         client.token = token
         client.user_id_clerk = user.id
         client.image = user.imageUrl
         setClient({...client})
         await getClientActive(client)
       }else{
         await getInvoice()
       }
     })()
 },[])
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      
      primary: {
        main: '#fff',
        contrastText: '#00a5cf',
      },
      
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar elevation={0} sx={{borderBottom: '1px solid'}} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalMallOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={linksObj.home.href}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'}}>
              SIGESC
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
            <LocalMallOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href={linksObj.home.href}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none' }}>
              SIGESC
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>
            <Box sx={{ flexGrow: 0,display:{md:'flex',wordSpacing: 2} }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Link className="flex" href={linksObj.payments.href}>
                  <PiContactlessPayment />
                </Link>
              </IconButton>
              <IconButton onClick={()=>setStateShow(true)} size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={ListOrder.invoice_items.length} className='flex' color="success">
                  <BiShoppingBag />
                </Badge>
              </IconButton>
              <IconButton>
                {
                  isSignedIn ? (<ClientUser/>):(<Avatar className='flex' alt="Remy Sharp" src="/static/images/avatar/2.jpg" />)
                }
              </IconButton>
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
    
  );
}
export default ResponsiveAppBar;
