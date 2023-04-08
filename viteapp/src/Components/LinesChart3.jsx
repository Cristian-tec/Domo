import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../Context/mqContext'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



export default function LinesChart3() {

    const { temperatureDefault, timeDefault, hallDefault } = useContext(mqContext);
    console.log(temperatureDefault, timeDefault);

    const [paint1, setPaint1] = useState(false);
    const [paint2, setPaint2] = useState(false);

    //-------------------- VALOR DE GRAFICA ---------------------------

    //setCurrentTime(new Date().toLocaleTimeString());
    let midata = {
        labels: timeDefault,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Temperature [°c]',
                data: temperatureDefault,
                tension: 0.3,
                fill: paint1,
                borderColor: 'rgb(105, 232, 63)',
                backgroundColor: 'rgba(0, 254, 17, 0.5)',
                pointRadius: 5,
                pointBorderColor: '#43ef46',
                pointBackgroundColor: '#43ef46',
            },
            {
                label: 'Magnetic [mT]',
                data: hallDefault,
                tension: 0,
                fill: paint2,
                borderColor: 'rgb(175, 175, 175)',
                backgroundColor: 'rgba(116, 116, 116, 0.5)',
                pointRadius: 5,
                pointBorderColor: '#5d5d5d',
                pointBackgroundColor: '#5d5d5d'
            },
        ],
    };

    let misoptions = {
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: { color: 'rgb(92, 92, 92)' }
            }
        }
    };

    //---------------------------------------------------------------

    /*     useEffect(() => {
              setTimeout(() => {
                 setUpd(!upd)
             }, 1000); 
    
        }, [midata]); */

    return (
        <>
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Grid item xs={12} sm={9} sx={{ display: 'flex', flexDirection:{xs:'column', sm:'row'}}}>
                    <Line data={midata} options={misoptions} />
                    <Grid item mt={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button onClick={() => setPaint1(!paint1)} variant='contained' sx={{ marginBottom: 1 }} >PAINT 1</Button>
                        <Button onClick={() => setPaint2(!paint2)} variant='contained' sx={{ marginBottom: 1 }}>PAINT 2</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}