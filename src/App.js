import { useContext, useEffect } from 'react'

import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import './App.css';
import DollarCostAverage from 'pages/DollarCostAverage';
import { GlobalContext } from 'state/contexts/GlobalContext';
import { Backdrop, CircularProgress } from "@mui/material";
import { auth } from 'firebase'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Portfolio from 'pages/Portfolio';
import Login from 'pages/Login';
import Signup from 'pages/Signup'
import Account from 'pages/Account'
import Splash from 'pages/Splash';
import { db } from 'firebase'
import PrivateRoute from 'routes/PrivateRoute';

function App() {

  const { state, pending } = useContext(GlobalContext)

  console.log(state.user.uid)

      // useEffect(() => {
      //     if(!state.user.uid && !pending){
      //       auth.signInAnonymously()
      //         .then(() => {
      //           //Signed in
      //           db.collection('users').doc(state.user.uid).set({
      //             exists: true
      //           })
      //         })
      //         .catch(err => {console.log(err.message)})
      //     }

      // }, [state.user.uid, pending])
    


  if (state.marketData.loading || pending || !state.user.uid ) {
      return (
      <Backdrop sx={{ backgroundColor: 'black'}} open>
        <CircularProgress />
      </Backdrop>);
    }

  return (
    <ThemeProvider theme={state.theme.theme()}>
      <Router>
        <Main
          top={<Nav />}
          side={<Sidebar />}
          main={
            <>
            <PrivateRoute path='/portfolio/:id' component={Portfolio} />
            <PrivateRoute path='/dca' component={DollarCostAverage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/account' component={Account} />
            <Route path='/welcome' component={Splash} />
            </>
        }
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
