import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';


export default function BoxIndicator({description, letter, title, value, unit, color, icon}) {
    return (
        <Grid item boxShadow={3} sx={{ height: 100, width: 250, backgroundColor: '#ffffff', margin: 1, borderRadius: 2 }}>
            <Box mx={1} mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography mt={2.5} ml={1} variant="body1" style={{ color: '#434242' }}>{description}</Typography>
                <Avatar sx={{ bgcolor: `${color}` }}>{(letter) ? letter : icon}</Avatar>
            </Box>

            <Box mr={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography ml={2} variant="h5" color="initial" >{title}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography mb={1} variant="h4" color="initial">{value}</Typography>
                    <Typography variant="h5" color="initial">{unit}</Typography>
                </Box>
            </Box>
        </Grid>
    )
}
