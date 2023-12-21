import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/Login';
import UserRegister from './pages/Register';
import Course from './pages/Course';

const App = () => {
  return (
    <Router>
      <Routes>
        {/*login and registration */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        <Route path="/" element={<Home />} />
        <Route path='/course/:course_id' element={<Course/>}/>
      </Routes>
    </Router>
  );
};

export default App