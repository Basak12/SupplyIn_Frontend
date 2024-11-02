import React from 'react';
import './App.css';
import AHPTestComponent from "./content/ahp";
import Grid from '@mui/material/Grid2';
import { NavigationProvider } from './context/Navigation';
import AppRouter from "./router";

function App() {

  return (
      <Grid container justifyContent='center'>
          <NavigationProvider>
              <AHPTestComponent/>
              <AppRouter/>
          </NavigationProvider>
      </Grid>
  );
}

export default App;
