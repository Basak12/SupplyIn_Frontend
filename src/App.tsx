import React from 'react';
import './App.css';
import AHPTestComponent from "./content/ahp";
import Grid from '@mui/material/Grid2';
//unstable grid
function App() {
   //AHP test component below

  return (
      <Grid container justifyContent='center'>
        <AHPTestComponent/>
      </Grid>
  );
}

export default App;
