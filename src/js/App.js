import '../css/App.css';
import Board from './Board.js'
import { initializeFirebase } from '../utilities/firebase';
import SideMenu from './SideMenu';

function App() {
  initializeFirebase();
  
  return (
    <div className="App">
      <Board />
      <SideMenu />
    </div>
  );
}

export default App;
