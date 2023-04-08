import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../Context/mqContext';
import { Box, Typography } from '@mui/material'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export default function StartStop({ status }) {
    //let status = true
    return (
        <Grid container sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 280,
            backgroundColor: 'blue',
            minHeight: 150
        }}>
            <Grid item sx={{ display: 'flex' }}>
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<PlayCircleOutlineIcon />}
                        sx={{
                            marginRight: 1, width: 80,
                            height: 60, backgroundColor: 'green'
                        }}
                    >
                        Start
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<StopCircleIcon />}
                        sx={{ marginRight: 1, width: 80, height: 60, backgroundColor: 'red' }}
                    >
                        Stop
                    </Button>
                </Box>
                <Box sx={{
                    width: 80,
                    height: 60,
                    backgroundColor: '#aaaaaa',
                    borderRadius: 1,
                    display: '#07707df',
                    flexDirection: 'column',

                }}>
                    <Typography align='center' variant="h6" color="white">STATUS</Typography>
                    {(status)
                        ?
                        <Typography align='center' variant="body1" color="white" sx={{ backgroundColor: 'green' }}>ON</Typography>
                        :
                        <Typography align='center' variant="body1" color="white" sx={{ backgroundColor: 'red' }}>OFF</Typography>}
                </Box>

            </Grid>
        </Grid>
    )
}
