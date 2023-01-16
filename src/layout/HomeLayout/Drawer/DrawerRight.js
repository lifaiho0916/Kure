import { Grid, List, Stack, Typography, ListItem, Link } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Resource } from "../../../request/Resource";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "components/Toast";

function DrawerRight({ setShowDrawerRight, showDrawerRight }) {
  const cssDrawerRight = [
    {
      background: 'white',
      display: 'block',
      position: 'fixed',
      top: '0',
      right: '-500px',
      height: '100vh',
      width: '98vw',
      maxWidth: '440px',
      minWidth: '250px',
      zIndex: '1100',
      margin: 0,
      padding: '10px',
      transition: 'all .3s ease-in'
    },
    showDrawerRight && { right: '0' }
  ];
  const cssH2 = {
    padding: '20px 24px',
    fontSize: '35px',
    fontWeight: 'bold',
    lineHeight: '45px',
    color: 'black'
  };
  const cssLink = {
    display: 'block',
    fontSize: '23px',
    fontWeight: 'bold',
    color: '#000',
    ml: '50px'
  };

  const resource = new Resource();
  const navigate = useNavigate();

  const user_name = resource.userGetName();
  let menu_anonymous = [
    {
      type: 'create_account',
      label: 'Create account',
      path: '/register',
    },
    {
      type: 'login',
      label: 'Login',
      path: '/login',
    },
  ];
  let menu_logged_in = [
    {
      type: 'my_account',
      label: 'My account',
      path: '/user',
    },
    {
      type: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      type: 'logout',
      label: 'Logout',
      path: '/user/logout',
    }
  ];
  const menu = (resource.isLoggedIn()) ? menu_logged_in : menu_anonymous;

  const [messageToast, setMessageToast] = useState('');

  const onClickLink = (item) => {
    switch (item.type) {
      case 'logout':
        resource.userLogout().then((e) => {
          setMessageToast('Logged out successfully');
        }).catch((e) => {
          console.log(e);
        });
        break;

      default:
        navigate(item.path);
        break;
    }
    setShowDrawerRight(false);
  };

  return (
    <>
      <Toast messageToast={messageToast} setMessageToast={setMessageToast}/>
      <Grid sx={cssDrawerRight}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0} sx={cssH2}>
          <Typography variant={'h2'}>Hi there {user_name}!</Typography>
          <HighlightOffIcon
            sx={{ width: '50px', minHeight: '50px', cursor: 'pointer' }}
            onClick={() => setShowDrawerRight(false)}
          ></HighlightOffIcon>
        </Stack>
        <List sx={{ mt: '45px' }}>
          {menu.map((item, index) => (
            <ListItem key={index} sx={{ p: '20px' }}>
              <Link onClick={() => onClickLink(item)} underline="hover"
                    sx={cssLink}>
                {item.label}
              </Link>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}

export default DrawerRight;
