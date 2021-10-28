import { useContext } from 'react'

import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import './App.css';
import DollarCostAverage from 'pages/DollarCostAverage';
import { GlobalContext } from 'state/contexts/GlobalContext';
import { Backdrop, CircularProgress } from "@mui/material";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Portfolio from 'pages/Portfolio';
import Login from 'pages/Login';
import Signup from 'pages/Signup'
import Account from 'pages/Account'
import Splash from 'pages/Splash';
import PrivateRoute from 'routes/PrivateRoute';
import PortfolioMain from 'pages/PortfolioMain';

function App() {

  const { state, pending } = useContext(GlobalContext)

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
              <PrivateRoute exact path='/' component={Portfolio} />
              <PrivateRoute exact path='/portfolio' component={PortfolioMain} />
              <PrivateRoute path='/portfolio/:id' component={Portfolio} />
              <PrivateRoute path='/dca' component={DollarCostAverage} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <PrivateRoute path='/account' component={Account} />
              <Route path='/welcome' component={Splash} />
            </>
          }
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
