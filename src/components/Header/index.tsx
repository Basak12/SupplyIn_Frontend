import React, { FC } from "react";
import {useState, useEffect} from "react";
import {Typography, Box} from "@mui/material";

interface HeaderProps {
    pageName: string,
}
const Header: FC<HeaderProps> = ({pageName}) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    const tick = () => {
        setDate(new Date());
    }

    return(
        <>
            <Box style = {{
                width: "100%",
                backgroundColor: '#11192a',
                height: "60px",
            }}>
                <Box display = 'flex' justifyContent='space-between' p = "10px" >
                    <Box display = "flex" ml = {20} alignItems='center'>
                        <Typography color="white" variant = 'h5'>{pageName}</Typography>
                    </Box>
                    <Box display = "flex">
                        <Typography color = "white" variant = "h6" mx = "10px">{date.toLocaleDateString()}</Typography>
                        <Typography color = "white" variant = "h6">{date.toLocaleTimeString([], {hour12: false})}</Typography>
                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default Header;