import React, { FC } from "react";
import {Typography, Box} from "@mui/material";

interface HeaderProps {
    pageName: string,
}
const Header: FC<HeaderProps> = ({pageName}) => {

    return(
        <>
            <Box display='flex' alignItems='center'
                sx = {{
                backgroundColor: '#16223b',
                height: 40,
                padding: 2,
            }}>
                <Box display="flex">
                    <Typography variant='h5' sx={{ color: 'white', }}>
                        {pageName}
                    </Typography>
                    </Box>
            </Box>
        </>
    )
}

export default Header;
