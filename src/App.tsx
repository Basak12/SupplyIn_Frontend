import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid2';
import { NavigationProvider } from './context/Navigation';
import AppRouter from "./router";
import Header from "./components/Header";
import {useNavigation} from "react-router-dom";

function App() {

    //const { currentPath } = useNavigation();

  return (
      <Grid container justifyContent='center'>
          <NavigationProvider>
              <Header pageName={'page1'}/>
              <AppRouter/>
          </NavigationProvider>
      </Grid>
  );
}

export default App;
