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



export default function LinesChart2() {

    const { mqttPublish, client, state } = useContext(mqContext);
    const [upd, setUpd] = useState(false)

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
                label: 'Signal Strength [dBm]',
                data: temp,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(13, 131, 4)',
                //backgroundColor: 'rgba(23, 251, 19, 0.543)',
                pointRadius: 5,
                pointBorderColor: '#05a836',
                pointBackgroundColor: '#05a836',
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
                min: -100,
                max: 0,                
            },
            x: {
                ticks: { color: 'rgb(0, 0, 0)' }
            }
        }
    };

    //---------------------------------------------------------------

    useEffect(() => {

        client.on('message', (topic, message) => {
            const payload = { topic, message: JSON.parse(message) };
            const data = payload.message;
            if (topic == 'esp32/values') {
                //setValues({ temp: data.Temp, hall: data.Hall, hum: data.Hum, sto: data.Sto })
                let hora = new Date().toLocaleTimeString();
                temperatureDefault.shift();
                temperatureDefault.push(data.Sig);
                timeDefault.shift();
                timeDefault.push(hora);
                setUpd(!upd)
                //console.log(temp, time);

            }
        });
    }, [midata]);

    return (
        <Line  data={midata} options={misoptions} />
    )

}