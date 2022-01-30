import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Routes, Route } from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Feed from './Components/Feed';
import { AuthProvider } from './Context/AuthProvider';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Feed />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
