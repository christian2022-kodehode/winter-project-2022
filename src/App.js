import Countdown from "./components/Countdown/Countdown"
import MessageHistory from "./components/MessageHistory/MessageHistory"
import Jump from './components/Jump/Jump';
import SymbolLibrary from './components/SymbolLibrary/SymbolLibrary';

export default function App() {
  return (
    <>
      <Countdown />
      <MessageHistory />
      <Jump />
      <SymbolLibrary />
    </>
  );
}
