import LoginPage from './Pages/LoginPage/LoginPage';
import Image from '../src/assets/login-background.jpg'

function App() {
  return (
    <div className="relative overflow-y-hidden h-screen w-screen bg-red-400 flex flex-row items-center justify-center">
      <img className="absolute z-0 w-full" src={Image} alt="background"/>
      <LoginPage/>
    </div>
  );
}

export default App;
