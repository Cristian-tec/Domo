import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../../Context/mqContext'
import { Box } from '@mui/system';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { NavLink } from 'react-router-dom';
import InboxIcon from "@mui/icons-material/Inbox"
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';




export default function NavListDrawer({ navLinks }) {

    const { disconnect, connectStatus, mqttConnect } = useContext(mqContext);

    return (
        <Box sx={{
            width: 250
        }}>
            <nav>
                <List>
                    <ListItem
                        key='Home'
                        disablePadding
                    >
                        <ListItemButton
                            component={NavLink}
                            to={'/'}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        key='Control Ligth'
                        disablePadding
                    >
                        <ListItemButton
                            component={NavLink}
                            to={'/controlligth'}
                        >
                            <ListItemIcon>
                                <SettingsRemoteIcon />
                            </ListItemIcon>
                            <ListItemText>Control Ligth</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        key='Charts'
                        disablePadding
                    >
                        <ListItemButton
                            component={NavLink}
                            to={'/chart'}
                        >
                            <ListItemIcon>
                                <MultilineChartIcon />
                            </ListItemIcon>
                            <ListItemText>Charts</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        key='info'
                        disablePadding
                    >
                        <ListItemButton
                            component={NavLink}
                            to={'/info'}
                        >
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText>Info</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        key='connect'
                        disablePadding
                    >
                        <ListItemButton
                            component={NavLink}
                            to={'/'}
                            onClick={() => mqttConnect()}
                        >
                            <ListItemIcon>
                                <LinkIcon />
                            </ListItemIcon>
                            <ListItemText>Connect</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        key='disconnect'
                        disablePadding
                    >
                        <ListItemButton
                            component={NavLink}
                            to={'/offline'}
                            onClick={() => disconnect()}
                        >
                            <ListItemIcon>
                                <LinkOffIcon />
                            </ListItemIcon>
                            <ListItemText>Disconnect</ListItemText>
                        </ListItemButton>
                    </ListItem>

                </List>

            </nav>
        </Box >
    )
}
