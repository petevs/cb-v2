import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import {theme} from 'theme'
import AppProvider from 'state/contexts/AppContext';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Main
          top={<Nav />}
          side={<Sidebar />}
        />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
