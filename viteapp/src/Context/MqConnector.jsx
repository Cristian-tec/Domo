import React, { useEffect, useState } from 'react';
import { mqContext } from './mqContext'
import mqtt from 'mqtt/dist/mqtt';

const host = 'cristiantek.ml';
let clientId = `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`;
const port = 8094; //me conecto por ssl

const url = `wss://${host}:${port}/mqtt`;
const options = {
    keepalive: 30,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    },
    rejectUnauthorized: false
};
options.clientId = clientId;
options.username = 'web_client';
options.password = '121212';

const topicSubs = 'esp32/output';
const topicPubl = 'esp32/input';

const MqConnector = ({ children }) => {

    const [client, setClient] = useState(null);
    const [isSubed, setIsSub] = useState(false);
    //const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState('Disconnected');
    //console.log(2, 'eeeee')

    const mqttConnect = () => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(url, options));

    };

    const mqttSub = (topic, qos) => {
        if (client) {
            // const { topic, qos } = subscription;
            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return // para cortar la ejecucion
                }
                setIsSub(true)
            });
        }
    };

    const [enable, setEnable] = useState('enable');

    if (enable && connectStatus === 'Disconnected') {
        // console.log('Conectando a mqtt');
        setEnable(false)
        mqttConnect();
    }


    const [ledStatus, setLedStatus] = useState({
        led1: false,
        led2: false,
        led3: false,
    })

    const [values, setValues] = useState({
        "temp": '--',
        "hall": '--',
        "sto": '--',
        "hum": '--',
        "sig": '--'
    });

    const [info, setInfo] = useState({
        macA: '--',
        ssid: '--',
        hwV: '--',
        cpuF: '--',
        sdkV: '--',
        flash: '--'
    });


    //----------------------- SOLO PARA LAS GRAFICAS ---------------------------------
    let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let hall = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let time = ["00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"];
    const [temperatureDefault, setTemperatureDefault] = useState(temp);
    const [hallDefault, setHallDefault] = useState(hall);
    const [timeDefault, setTimeDefault] = useState(time);
    // creo que actualiza la grafica porque traslada el refresco de estados de aca a LIneChart3 ...no se...
    //--------------------------------------------------------------------------------

    useEffect(() => {
        //console.log(1, 'Entro al useEfect');

        if (client) {
            client.on('connect', () => {
                //console.log('Entrada OK');
                setConnectStatus('Connected');
                mqttSub(topicSubs, 0);//esp32/output
                mqttSub('esp32/values', 0);
                mqttSub('esp32/status', 0);
                mqttSub('esp32/info', 0);
                mqttSub('esp32/output', 0);
                //mqttPublish('esp32/update', 0, 'refresh');
                //console.log('Suscrito al topico: ' + topicSubs + " | " + 'updaate');
            });
            client.on('error', (err) => {
                console.log('Entrada error');
                setConnectStatus('Error en conexion!')
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                console.log('reconectando');
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {  // Esto esta siempre a la escucha
                // console.log('mensaje entrando....');
                //const payload = { topic, message: message.toString() };
                const payload = { topic, message: JSON.parse(message) };
                //console.log(1, payload.message);
                const data = payload.message;

                if (topic === topicSubs) {
                    setLedStatus({ led1: data.led1, led2: data.led2, led3: data.led3 });
                }

                if (topic == 'esp32/values') {
                    setValues({ temp: data.Temp, hall: data.Hall, hum: data.Hum, sto: data.Sto, sig: data.Sig })

                    // ------------ Esto es solo para LineChart3 ----------
                    let hora = new Date().toLocaleTimeString();
                    temp.shift();
                    temp.push(data.Temp);
                    time.shift();
                    time.push(hora);
                    hall.shift();
                    hall.push(data.Hall)
                    setTemperatureDefault(temp);
                    setTimeDefault(time);
                    setHallDefault(hall);
                    //-----------------------------------------------------
                }

                if (topic == 'esp32/info') {
                    console.log('entrando a info');
                    setInfo({ macA: data.macA, ssid: data.ssid, hwV: data.hwV, cpuF: data.cpuF, sdkV: data.sdkV, flash: data.flash })
                }

                if (topic === 'esp32/status') {
                    if (data.connected === false) {
                        setValues({ temp: '--', hall: '--', hum: '--', sto: '--', sig: '--' })
                    }
                }
                
            });
        }
        return () => {  // esto para que no quede redundante
            console.log('Desmontando');
            mqttDisconnect()
        }

    }, [client]);
    // console.log(23, connectStatus);


    const mqttDisconnect = () => {
        if (client) {
            client.end(() => {
                setConnectStatus('Disconnect');
            });
        }
    }

    const disconnect = () => {
        mqttDisconnect();
        setValues({
            "temp": '--',
            "hall": '--',
            "sto": '--',
            "hum": '--',
            "sig": '--'
        })
    }

    const mqttPublish = (topic, qos, payload) => {

        if (client) {
            //    client.publish(topic, payload, { qos }, error => {
            client.publish(topic, JSON.stringify(payload), { qos }, error => {
                if (error) {
                    console.log('Publish error: ', error);
                }
                //console.log('Publicando en :' + topic);
            });
        }
    }

    const mqttUnSub = (subscription) => {
        if (client) {
            const { topic } = subscription;
            client.unsubscribe(topic, error => {
                if (error) {
                    console.log('Unsubscribe error', error)
                    return
                }
                setIsSub(false);
            });
        }
    };

    const publicar = (state) => {
        mqttPublish(topicPubl, 0, JSON.stringify(state))
        console.log('Presiono publicar');
    }

    return (
        <mqContext.Provider
            value={{
                mqttPublish,
                values,
                client,
                info,
                temperatureDefault,
                timeDefault,
                hallDefault,
                disconnect,
                connectStatus,
                mqttConnect,
                ledStatus,

            }}
        >
            {children}
        </mqContext.Provider>
    )
}

export default MqConnector;