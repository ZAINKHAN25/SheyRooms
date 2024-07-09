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

        <Route path='/' element={
          <LandingScreen />
        } />

        <Route path='/home' element={
          <>
            <Navbar />
            <HomeScreen />
          </>
        } />
        <Route path='/book/:roomid/:checkin/:checkout' element={
          <>
            <Navbar />
            <BookingScreen />
          </>
        } />
        <Route path='/login' element={
          <>
            <Navbar />
            <LoginScreen />
          </>
        } />
        <Route path='/register' element={
          <>
            <Navbar />
            <RegisterScreen />
          </>
        } />
        <Route path='/profile' element={
          <>
            <Navbar />
            <ProfileScreen />
          </>
        } />
        <Route path='/admin' element={
          <>
            <Navbar />
            <AdminScreen />
          </>
        } />

      </Routes>
    </BrowserRouter>

  );
};
