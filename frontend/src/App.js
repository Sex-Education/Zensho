import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden font-roboto">
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
