import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../Context/mqContext';

import Navbar from './Navbar/Navbar'
import { Box, Typography } from '@mui/material'

import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

import { Container } from '@mui/system';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import StartStop from './StartStop';
import BoxIndicator from '../Components/BoxIndicator'
import Divider from '@mui/material/Divider';
import Time from './Time'
import LinesChart from './LinesChart';
import LinesChart2 from './LinesChart2';
import WifiIcon from '@mui/icons-material/Wifi';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import InfoDevice from './InfoDevice';
import ChartLine from './ChartLine'


export default function Home() {

    const { mqttPublish, client, values, temperatureDefault, hallDefault, timeDefault } = useContext(mqContext); // Traigo todo de mqqConector para usar lo que necesite

    const [input, setInput] = useState({
        led1: false,
        led2: false,
        led3: false,
    })

    const [stateLed, setStateLed] = useState({
        stateLed1: false,
        stateLed2: false,
        stateLed3: false,

    })

    const publicar = (state) => {
        mqttPublish('', 0, JSON.stringify(state))
        console.log('Presiono publicar');
    }

    const changeHandler = (e) => {
        const property = e.target.name;
        const value = e.target.checked;
        setInput({ ...input, [property]: value });
        //(topic, qos, payload) 
        mqttPublish('esp32/input', 0, { ...input, [property]: value }); // enviandolo asi resolvi el problema de estado anterior
        mqttPublish('esp32/update', 0, 'refresh'); //para saber si realmente encendio
        console.log('BOTONES');
    }
    
    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}> {/* {description, letter, title, value, unit, color} */}
                <BoxIndicator
                    description='Core number one'
                    //letter='C'
                    icon={<ThermostatIcon />}
                    title='Temperature:'
                    value={values.temp}
                    unit='°c'
                    color='orange'
                />

                <BoxIndicator
                    description='Room machine'
                    letter='H'
                    title='Humidity:'
                    value={values.hum}
                    unit='%'
                    color='purple'
                />

                <BoxIndicator
                    description='Magnetic Field'
                    letter='M'
                    title='Intensity:'
                    value={values.hall}
                    unit='mT'
                    color='red'
                />

                <BoxIndicator
                    description='Signal Intensity'
                    //letter='I'
                    icon={<WifiIcon />}
                    title='Strength:'
                    value={values.sig}
                    unit='dBm'
                    color='green'
                />

                <BoxIndicator
                    description='Capacity HDD'
                    letter='S'
                    title='Storage:'
                    value={values.sto}
                    unit='Gb'
                    color='blue'
                />
            </Grid>
            <Divider />
            <Grid container mt={3} mb={2} sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', backgroundColor: 'none' }}>
                {/* <Grid item ml={3} mr={1.5} xs={12} sm={12} md={5.5} sx={{ height: '350', backgroundColor: 'none' }}> */}
                    {/* <LinesChart /> */}
                    <ChartLine
                        curve1 = {temperatureDefault}
                        time = {timeDefault}
                    />
                {/* </Grid> */}
                <Grid item mt={1} ml={1.5} mr={3} xs={12} sm={12} md={5.5} sx={{ height: 300, backgroundColor: 'none' }}>
                    <LinesChart2 />
                </Grid>
            </Grid>
            <Divider />
            {/* <InfoDevice /> */}
            {/*   <StartStop /> */}
        </>


    )
}
