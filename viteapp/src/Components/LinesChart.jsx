import React, { useContext, useState, useEffect } from 'react'
import { mqContext } from '../Context/mqContext'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';

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



export default function LinesChart() {

    const { mqttPublish, client, state } = useContext(mqContext);

    //-------------------- VALOR DE GRAFICA ---------------------------

    let temperatureDefault = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const [temp, setTemp] = useState(temperatureDefault);
    let timeDefault = ["00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"];
    const [time, setTime] = useState(timeDefault)

    //setCurrentTime(new Date().toLocaleTimeString());
    let midata = {
        labels: time,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Temperature',
                data: temp,
                tension: 0.5,
                fill: false,
                borderColor: 'rgb(252, 145, 106)',
                backgroundColor: 'rgba(239, 115, 6, 0.617)',
                pointRadius: 5,
                pointBorderColor: 'rgba(238, 140, 55, 0.617)',
                pointBackgroundColor: 'rgba(239, 115, 6, 0.875)',
            },
            /*  {
                 label: 'Otra línea',
                 data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
             }, */
        ],
    };

    let misoptions = {
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: { color: 'rgb(138, 28, 0)', }
            }
        }
    };

    //---------------------------------------------------------------

    useEffect(() => {

        client.on('message', (topic, message) => {
            const payload = { topic, message: JSON.parse(message) };
            const data = payload.message;
            if (topic == 'esp32/values') {
                let hora = new Date().toLocaleTimeString();
                temperatureDefault.shift();
                temperatureDefault.push(data.Temp);
                timeDefault.shift();
                timeDefault.push(hora);
            }
        });
    }, [midata]);

    return (
        <Line  data={midata} options={misoptions} />
    )

}