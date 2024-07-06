import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { HomeScreen } from './screens/HomesScreen';
import { BookingScreen } from './screens/BookingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';
import { LandingScreen } from './screens/LandingScreen';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingScreen />} />

        <Route path='/home' element={<Navbar><HomeScreen /></Navbar>} />
        <Route path='/book/:roomid/:checkin/:checkout' element={<Navbar><BookingScreen /></Navbar>} />
        <Route path='/login' element={<Navbar><LoginScreen /></Navbar>} />
        <Route path='/register' element={<Navbar><RegisterScreen /></Navbar>} />
        <Route path='/profile' element={<Navbar><ProfileScreen /></Navbar>} />
        <Route path='/admin' element={<Navbar><AdminScreen /></Navbar>} />
      </Routes>
    </BrowserRouter>
  );
};
