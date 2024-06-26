
import './App.css';
import Home from './screens/Home';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Log from './screens/Log';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/createuser" element={<Log></Log>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
