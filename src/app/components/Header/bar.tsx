import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
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
import Search from '../Home/products/search';
import ChangeCurrency from './changeCurrency';
 function ResponsiveAppBar() {
  const {setStateShow,ListOrder} = useRequestCardContext()
   const {getClientActive} = CartServices()
   const {client,setClient} = useClientContext()
   const { isSignedIn, user, isLoaded } = useUser();
   if (!isLoaded) {
     return null;
   }
 
   React.useEffect(()=>{
    (async()=>{
      if (isSignedIn) {
        const token = localStorage.getItem('clerk-db-jwt') || null
        client.name = user.fullName || ''
        client.email = user.emailAddresses[0].emailAddress
        client.surname = user.firstName || ''
        client.token = token
        client.user_id_clerk = user.id
        client.image = user.imageUrl        
        setClient({...client})
        await getClientActive(client)
      }
    })()
   },[user])

 

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
      <AppBar elevation={0} sx={{borderBottom: '1px solid',position: 'relative',height: 'auto'}} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalMallOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Link href={linksObj.home.href}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href={'#'}
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
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
             
            </Box>
            <Link href={linksObj.home.href}>
              <LocalMallOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            </Link>
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
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
            </Box>
            <Search/>
            <Box sx={{ flexGrow: 0,display:{md:'flex',wordSpacing: 2} }}>
              {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <ChangeCurrency />
              </IconButton> */}
              <IconButton onClick={()=>setStateShow(true)} size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={ListOrder.invoice_items.length} className='flex' color="success">
                  <BiShoppingBag />
                </Badge>
              </IconButton>
              <IconButton>
                {
                  isSignedIn ? (<ClientUser/>):(<Link href={'/sign-in'}><Avatar className='flex' alt="Remy Sharp" src="/static/images/avatar/2.jpg" /></Link> )
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
