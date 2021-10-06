import { useContext } from 'react'
import { ThemeContext } from 'state/contexts/ThemeContext';
import 'normalize.css'

import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import './App.css';
import DollarCostAverage from 'pages/DollarCostAverage';
import { MarketDataContext } from 'state/contexts/MarketDataContext';
import { Backdrop, CircularProgress } from "@mui/material";

function App() {

  const { themeState } = useContext(ThemeContext)
  const { marketData } = useContext(MarketDataContext)

  if (marketData.loading) {
      return (
      <Backdrop sx={{ backgroundColor: 'black'}} open>
        <CircularProgress />
      </Backdrop>);
    }

  return (
    <ThemeProvider theme={themeState.theme()}>
        <Main
          top={<Nav />}
          side={<Sidebar />}
          main={<DollarCostAverage />}
        />
    </ThemeProvider>
  );
}

export default App;
