import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../../Context/mqContext'
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'

import NavListDrawer from './NavListDrawer'
import MenuIcon from '@mui/icons-material/Menu';

import InboxIcon from "@mui/icons-material/Inbox"
import DraftsIcon from "@mui/icons-material/Drafts"
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Box, width } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

const navLinks = [
  {
    title: 'Home', path: '/', icon: <InboxIcon />
  },
  {
    title: 'Info', path: '/info', icon: <InfoIcon />
  },
];



export default function Navbar() {

  const { mqttPublish, client, connectStatus } = useContext(mqContext);
  const [open, setOpen] = useState(false)

  /*   window.addEventListener("resize", function () {
  
      if (window.screen.width < 600)
        console.log('La resolucion es: ' + window.screen.width);
    }); */


  const [statusConection, setStatusConection] = useState(false);

  useEffect(() => {

    mqttPublish('esp32/update', 0, 'refresh');

    client.on('message', (topic, message) => {
      const payload = { topic, message: JSON.parse(message) };
      const data = payload.message;

      if (topic === 'esp32/values') {
        setStatusConection(true)
      }

      if (topic === 'esp32/status') {
        if (data.connected === false || connectStatus === 'Disconnect') {
          setStatusConection(false);
        }
      }
    });
  }, []);


  return (
    <>
      <AppBar
        position='static'
      >
        <Toolbar>
          <IconButton
            color='inherit'
            size='large'
            onClick={() => setOpen(true)}
          //sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>DOMO</Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {
              navLinks.map(elem => (
                <Button
                  color='inherit'
                  key={elem.title}
                  component={NavLink}
                  to={elem.path}
                >{elem.title}</Button>
              ))
            }
          </Box>
          {(statusConection)
            ?
            <Box mt={-0.5}>
              <WifiIcon />
            </Box>
            :
            <Box mt={-0.5}>
              <WifiOffIcon />
            </Box>
          }

        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor='left'
        onClose={() => setOpen(false)}
      //sx={{ display: { xs: 'flex', sm: 'none' } }} //lo coloco por experiencia de usuario por ejemplo para una tablet
      //que no muestre el panel y los botones a la vez cdo pasa de vertical a horizontal
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>

    </>
  )
}
