import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../Context/mqContext';

import { Box, Divider, Typography, CardMedia } from '@mui/material'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navbar from './Navbar/Navbar';
import Esp from '../Images/esp32.png'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('MAC Address', 159,),
    createData('SSID', '-----',),
    createData('HW Version', 262,),
    createData('CPU frecuency', 305,),
    //createData(<Button>OBTAIN</Button>)
];


export default function InfoDevice() {

    const { mqttPublish, info } = useContext(mqContext);

    const getData = () => {
        mqttPublish('esp32/getInfoDevice', 0, { msg: 'getInfo' });
    }

    return (

        <Grid container mt={2} sx={{ display: 'flex', flexDirection: 'row' }}>

            <Grid item ml={2} mb={2} mr={2} xs={12} sm={12} md={12} lg={5.7} sx={{}}>
                <Box>
                    <Typography variant="h4" color="initial">Info device</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="grey">MAC Address:</Typography>
                    <Typography variant="body1" color="grey" mt={1}>{info.macA}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="grey">SSID:</Typography>
                    <Typography variant="body1" color="grey" mt={1}>{info.ssid}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="grey">Hadware Version:</Typography>
                    <Typography variant="body1" color="grey" mt={1}>{info.hwV}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="grey">Frecuency:</Typography>
                    <Typography variant="body1" color="grey" mt={1}>{info.cpuF} Mhz</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="grey">SdK</Typography>
                    <Typography variant="body1" color="grey" mt={1}>{info.sdkV}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="grey">Flash Size:</Typography>
                    <Typography variant="body1" color="grey" mt={1}>{info.flash} Mb</Typography>
                </Box>
                <Divider />
                <Box mt={2} sx={{ display: 'flex', }}>
                    <Button fullWidth onClick={getData} variant='contained'>GET INFO</Button>
                </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item ml={2} mr={2} xs={12} sm={12} md={12} lg={5.7} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'none' }}>
                {/* <Typography variant="h5" color="initial">
                    How to work?
                </Typography>
                <Typography variant="h6" color="grey">
                    A program has been loaded, in an espressif module.
                    It has been configured to connect to any Wi-Fi network that exists in your area.
                    Once this is done, it connects to a vps in Oracle, and sends the previously configured data,
                    and the same server distributes them to the computers that are subscribed.
                    The protocol used for communication is MQTT (Message Queuing Telemetry Transport), which has
                    a library that can be used by react under java script. <div> For more information, contact me.</div>
                </Typography> */}
                <Box>
                    <img src={Esp} alt="1" />
                </Box>

            </Grid>
        </Grid>

    )
}
