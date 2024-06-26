
import './App.css';
import Body from './screens/Body';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Log from './screens/Log';
import Profile from './screens/Profile'
import Cart from './screens/Cart'
import Checkout from './screens/Checkout'
import Orders from './screens/Orders'
import { CartProvider } from './context/ContextReducer';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Body></Body>}></Route>
            <Route exact path="/createuser" element={<Log></Log>}></Route>
            <Route exact path="/profile" element={<Profile></Profile>}></Route>
            <Route exact path="/cart" element={<Cart></Cart>}></Route>
            <Route exact path="/checkout" element={<Checkout></Checkout>}></Route>
            <Route exact path="/orders" element={<Orders></Orders>}></Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
