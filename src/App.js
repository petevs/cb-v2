import { useContext } from 'react'

import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import './App.css';
import DollarCostAverage from 'pages/DollarCostAverage';
import { GlobalContext } from 'state/contexts/GlobalContext';
import { Backdrop, CircularProgress } from "@mui/material";

function App() {

  const { state } = useContext(GlobalContext)

  if (state.marketData.loading) {
      return (
      <Backdrop sx={{ backgroundColor: 'black'}} open>
        <CircularProgress />
      </Backdrop>);
    }

  return (
    <ThemeProvider theme={state.theme.theme()}>
        <Main
          top={<Nav />}
          side={<Sidebar />}
          main={<DollarCostAverage />}
        />
    </ThemeProvider>
  );
}

export default App;
