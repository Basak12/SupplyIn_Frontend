import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid2';
import { NavigationProvider } from './context/Navigation';
import AppRouter from "./router";

function App() {

  return (
      <Grid container justifyContent='center'>
          <NavigationProvider>
              <AppRouter/>
          </NavigationProvider>
      </Grid>
  );
}

export default App;
