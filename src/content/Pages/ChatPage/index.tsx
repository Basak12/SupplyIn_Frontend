import React, {FC, useCallback, useEffect, useState} from 'react';
import {
    Typography,
    Box,
    Divider,
    TextField, FormControl, InputAdornment, IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Navigate, useLocation} from "react-router-dom";
import LoadingWrapper from "../../../components/LoadingWrapper";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

interface AIChatPageProps {}

const AIChatPage: FC<AIChatPageProps> = ({}) => {
    const { pathname } = useLocation();
    const [query, setQuery] = useState<string>('');


    return (
        <>
            <Grid
              container
              display='flex'
              justifyContent='space-between'
              mx={1}
              direction='column'
              sx={{ minHeight: '100vh' }}
            >
                <Grid size={12}
                      sx={{
                          backgroundColor: '#2c2c40',
                          my:2,
                          borderWidth: 1,
                          borderRadius: 2
                      }}>
                    <Box m={2} display='flex' alignItems='center'>
                        <Typography fontSize={24} color='white' sx={{
                            ml:1
                        }}>Ask AI</Typography>
                        <AutoAwesomeIcon sx={{ml:1, color:'white'}}/>
                    </Box>
                </Grid>
                <Grid size={12} display='flex' justifyContent='center' mb={2}>
                        <TextField
                            slotProps={{
                                input: {
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => console.log('query', query)}
                                            >
                                                <ArrowCircleUpIcon fontSize='medium' sx={{color:'#c0c0ec'}} />
                                            </IconButton>
                                        </InputAdornment>
                                },
                            }}
                            multiline
                            maxRows={3}
                            placeholder='Start typing here...'
                            value={query}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setQuery(event.target.value);}}
                            sx={{
                                height: '100%',
                                overflow: 'auto',
                                width: '50%',
                                border: 1,
                                borderColor: '#c0c0ec',
                                borderRadius: 2,
                                fontSize: 16,
                                color: '#ffffff',
                                backgroundColor: '#2c2c40',
                                '& .MuiInputBase-input': {
                                    color: '#ffffff',
                                },
                                '&:focus': {
                                    backgroundColor: '#515173',
                                }
                            }}
                        />
                </Grid>
            </Grid>
        </>
    );
};

export default AIChatPage;

