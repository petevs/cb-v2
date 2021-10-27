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

function App() {

  const { state, pending } = useContext(GlobalContext)

      useEffect(() => {

        if(!auth.uid){
          auth.signInAnonymously()
            .then(() => {
              //Signed in
            })
            .catch(err => {console.log(err.message)})
        }
      }, [])
    


  if (state.marketData.loading || pending ) {
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
            <Route path='/portfolio/:id' component={Portfolio} />
            <Route path='/dca' component={DollarCostAverage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/account' component={Account} />
            </>
        }
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
