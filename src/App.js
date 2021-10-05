import { useContext } from 'react'
import { AppContext } from 'state/contexts/AppContext';
import 'normalize.css'

import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import './App.css';
import DollarCostAverage from 'pages/DollarCostAverage';

function App() {

  const { appState } = useContext(AppContext)

  return (
    <ThemeProvider theme={appState.theme()}>
        <Main
          top={<Nav />}
          side={<Sidebar />}
          main={<DollarCostAverage />}
        />
    </ThemeProvider>
  );
}

export default App;
