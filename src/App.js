import logo from './logo.svg';
import './App.css';
import Countdown from "./components/Countdown/Countdown"
import Chat from "./components/Chat/Chat"
import Jump from './components/Jump/Jump';
import SymbolLibrary from './components/SymbolLibrary/SymbolLibrary';

function App() {
  return (
    <>
      <Countdown />
      <Chat />
      <Jump />
      <SymbolLibrary />
    </>
  );
}

export default App;
