
import './App.css';
import { Register } from './component/Register';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LandingPage  from './component/LandingPage';
import { LoginPage } from './component/LoginPage';
import Store from './component/Store';
function App() {
  return (
    <div className="App">
      <>
  <Router >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginPage" element={<LoginPage  />} />
        <Route path="/Store" element={<Store/>} />

      </Routes>
    </Router>      
    </>
    </div>
  );
}

export default App;
