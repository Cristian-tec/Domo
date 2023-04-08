import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../Context/mqContext';

import { Box, Divider, Typography, CardMedia } from '@mui/material'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navbar from './Navbar/Navbar';
import Esp from '../Images/esp32.png'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Slider from '@mui/material/Slider';

export default function ControlLigth() {

    const { mqttPublish, client, connectStatus } = useContext(mqContext);

    const [state, setState] = useState(true);

    const [input, setInput] = useState({
        led1: false,
        led2: false,
        led3: false,
    })

    const [ledStatus, setLedStatus] = useState({
        led1: false,
        led2: false,
        led3: false,
    })


    const [slider, setSlider] = useState(10);
    const handleSlider = (e) => {
        let property = e.target.name;
        let value = e.target.value;
        setSlider(value)
        mqttPublish('esp32/slider', 0, { slider: value });
    }

    const handleButton = (e) => {
        let property = e.target.name;
        let value = e.target.checked;

        if (property === 'led1') setInput({ ...input, [property]: value });

        if (property === 'led2') setInput({ ...input, [property]: value });

        if (property === 'led3') setInput({ ...input, [property]: value });

        mqttPublish('esp32/input', 0, { ...input, [property]: value });
        mqttPublish('esp32/update', 0, 'refresh');

    }

    useEffect(() => {

        mqttPublish('esp32/update', 0, 'refresh');

        client.on('message', (topic, message) => {
            const payload = { topic, message: JSON.parse(message) };
            const data = payload.message;

            if (topic == 'esp32/output') {
                setInput({ led1: data.led1, led2: data.led2, led3: data.led3 })
                setLedStatus({ led1: data.led1, led2: data.led2, led3: data.led3 });
            }

        })

    }, []);

    return (
        <>
            <Grid container mt={2} sx={{ width: '100%', backgroundColor: 'none', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

                <Grid item mb={1} boxShadow={3} sx={{ marginLeft: { xs: 0, sm: 0, md: 0 }, width: 300, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: 2, color: '#940000' }}>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: '#940000' }}>
                        <Typography align='center' variant="h6" color="white">RED LIGTH</Typography>
                    </Box>
                    <Box mb={1} >
                        <Button
                            name='led1'
                            variant="contained"
                            onClick={handleButton}
                            startIcon={<PlayCircleOutlineIcon />}
                            value="true"
                            checked={true}
                            sx={{
                                marginRight: 1, width: 80, marginLeft: 1,
                                height: 60, backgroundColor: 'green'
                            }}
                        >
                            Start
                        </Button>
                        <Button
                            name='led1'
                            variant="contained"
                            onClick={handleButton}
                            value="false"
                            checked={false}
                            startIcon={<StopCircleIcon />}
                            sx={{ marginRight: 1, marginLeft: 1, width: 80, height: 60, backgroundColor: 'red' }}
                        >
                            Stop
                        </Button>
                    </Box>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: 'grey' }}>
                        <Typography align='center' variant="h6" color={(ledStatus.led1) ? 'white' : 'red'}><b>{(ledStatus.led1) ? 'ON' : 'OFF'}</b></Typography>
                    </Box>
                </Grid>

                <Grid item mb={1} boxShadow={3} sx={{ marginLeft: { xs: 0, sm: 0, md: 5 }, width: 300, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: 2, color: '#940000' }}>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: '#940000' }}>
                        <Typography align='center' variant="h6" color="white">GREEN LIGTH</Typography>
                    </Box>
                    <Box mb={1}>
                        <Button
                            name='led2'
                            variant="contained"
                            onClick={handleButton}
                            startIcon={<PlayCircleOutlineIcon />}
                            value='true'
                            checked={true}
                            sx={{
                                marginRight: 1, width: 80, marginLeft: 1,
                                height: 60, backgroundColor: 'green'
                            }}
                        >
                            Start
                        </Button>
                        <Button
                            name='led2'
                            variant="contained"
                            onClick={handleButton}
                            value='false'
                            checked={false}
                            startIcon={<StopCircleIcon />}
                            sx={{ marginRight: 1, marginLeft: 1, width: 80, height: 60, backgroundColor: 'red' }}
                        >
                            Stop
                        </Button>
                    </Box>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: 'grey' }}>
                        <Typography align='center' variant="h6" color={(ledStatus.led2) ? 'white' : 'red'}><b>{(ledStatus.led2) ? 'ON' : 'OFF'}</b></Typography>
                    </Box>
                </Grid>

                <Grid item mb={1} boxShadow={3} sx={{ marginLeft: { xs: 0, sm: 0, md: 5 }, width: 300, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: 2, color: '#940000' }}>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: '#940000' }}>
                        <Typography align='center' variant="h6" color="white">YELLOW LIGTH</Typography>
                    </Box>
                    <Box mb={1}>
                        <Button
                            name='led3'
                            variant="contained"
                            onClick={handleButton}
                            startIcon={<PlayCircleOutlineIcon />}
                            value={true}
                            checked={true}
                            sx={{
                                marginRight: 1, width: 80, marginLeft: 1,
                                height: 60, backgroundColor: 'green'
                            }}
                        >
                            Start
                        </Button>
                        <Button
                            name='led3'
                            variant="contained"
                            onClick={handleButton}
                            value={false}
                            checked={false}
                            startIcon={<StopCircleIcon />}
                            sx={{ marginRight: 1, marginLeft: 1, width: 80, height: 60, backgroundColor: 'red' }}
                        >
                            Stop
                        </Button>
                    </Box>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: 'grey' }}>
                        <Typography align='center' variant="h6" color={(ledStatus.led3) ? 'white' : 'red'}><b>{(ledStatus.led3) ? 'ON' : 'OFF'}</b></Typography>
                    </Box>
                </Grid>

                <Grid item boxShadow={3} sx={{ marginLeft: { xs: 0, sm: 0, md: 5 }, height: 150, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', border: 2, color: '#940000' }}>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: '#940000' }}>
                        <Typography align='center' variant="h6" color="white">DIMER PULSE</Typography>
                    </Box>
                    <Box width={300} mt={1}>
                        <Slider
                            name='slider'
                            //color="secondary"
                            sx={{ color: 'brown', marginLeft: 1, marginRight: 1, width: 282 }}
                            value={slider}
                            step={1}
                            min={0}
                            max={255}
                            orientation='horizontal'
                            //size='medium'
                            aria-label="Default"
                            onChange={handleSlider}
                        />

                    </Box>
                    <Box mb={1} sx={{ width: '100%', backgroundColor: 'grey' }}>
                        <Typography align='center' variant="h6" color='white'><b>{slider}</b></Typography>
                    </Box>
                </Grid>
            </Grid>
            <Divider />
        </>
    )
}
