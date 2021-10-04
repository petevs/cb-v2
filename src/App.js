import Nav from 'components/nav/Nav';
import Sidebar from 'components/sidebar/Sidebar';
import Main from 'layouts/Main';
import './App.css';

function App() {
  return (
    <Main
      top={<Nav />}
      side={<Sidebar />}
    />
  );
}

export default App;
