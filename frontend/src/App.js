import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import YourDataset from './pages/YourDataset';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden font-roboto">
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<><NavBar/></>}/>
          <Route path='/store' element={<><NavBar/></>}/>
          <Route path='/dataset' element={<><NavBar/><YourDataset/></>}/>
          <Route path='/subscription' element={<><NavBar/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
