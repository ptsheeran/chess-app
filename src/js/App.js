import '../css/App.css';
import Board from './Board.js'
import { initializeFirebase } from '../utilities/firebase';
import SideMenu from './SideMenu';
import { useState } from 'react';

function App() {
  let [gameId, setGameId] = useState();
  let [color, setColor] = useState();

  initializeFirebase();
  
  return (
    <div className="App">
      <Board gameId={gameId} color={color}/>
      <SideMenu gameId={gameId} onGameIdChange={setGameId} onColorChange={setColor}/>
    </div>
  );
}

export default App;
