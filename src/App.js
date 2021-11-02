import { useContext } from 'react'

import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { GlobalContext } from 'state/contexts/GlobalContext';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from 'routes/PrivateRoute';
import Loading from 'components/Loading';

//PAGES
import Portfolio from 'scenes/portfolio/Portfolio';
import Login from 'pages/Login';
import Signup from 'pages/Signup'
import Account from 'scenes/account/Account'
import Splash from 'pages/Splash';
import PortfolioMain from 'scenes/portfolio/components/PortfolioMain';

function App() {

  const { state, pending } = useContext(GlobalContext)

  if (state.marketData.loading || pending ) {
      return (
        <Loading />
      )
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
