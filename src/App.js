
import './App.css';
import Home from './screens/Home';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
