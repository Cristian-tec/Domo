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



export default function ChartLine({curve1, time, min, max, unit, color}) {

    //-------------------- VALOR DE GRAFICA ---------------------------

    //setCurrentTime(new Date().toLocaleTimeString());
    let midata = {
        labels: time,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: unit,
                data: curve1,
                tension: 0.3,
                fill: false,
                borderColor: color,
                backgroundColor: color,
                pointRadius: 5,
                pointBorderColor: color,
                pointBackgroundColor: color,
            },    
        ],
    };

    let misoptions = {
        scales: {
            y: {
                min: min,
                max: max
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
            {/* <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> */}
                <Grid item xs={12} sm={9} md={6} sx={{ display: 'flex', flexDirection:{xs:'column', sm:'row'}}}>
                    <Line data={midata} options={misoptions} />
                </Grid>
            {/* </Grid> */}
        </>
    )

}