import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import UploadDataset from './pages/UploadDataset';
import StoreOverview from './pages/StoreOverview';
import ViewDataset from './pages/ViewDataset';
import Search from './pages/Search';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden font-roboto">
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<><NavBar/></>}/>
          <Route path='/store' element={<><NavBar/><StoreOverview/></>}/>
          <Route path='/upload' element={<><NavBar/><UploadDataset/></>}/>
          <Route path='/dataset/:id' element={<><NavBar/><ViewDataset/></>}/>
          <Route path='/search' element={<><NavBar/><Search/></>}/>
          <Route path='/subscription' element={<><NavBar/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
