import AuthPage from './pages/AuthPage'
import Image from '../src/assets/login-background.jpg'

function App() {
  return (
    <div className="background-container">
      <img className="background" src={Image} alt="background"/>
      <AuthPage/>
    </div>
  );
}

export default App;
