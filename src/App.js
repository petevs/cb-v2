import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import { ThemeProvider } from 'styled-components';
import {theme} from 'theme'
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main
        top={<Nav />}
        side={<Sidebar />}
      />
    </ThemeProvider>
  );
}

export default App;
