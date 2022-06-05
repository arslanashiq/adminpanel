import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Navigationx } from "./Navigationx/Navigationx";
import Orders from './WebPages/Orders/Orders'
function App() {
  return (
    <BrowserRouter>
      <Navigationx />
    </BrowserRouter>
  );
}

export default App;
