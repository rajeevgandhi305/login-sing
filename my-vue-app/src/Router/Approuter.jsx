import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import HomePage from '../components/Home/Homepage';
import Registration from '../components/Registration/Registration';
import User from'../components/User/User';
import UserList from'../components/UserList/UserList';
import Update from'../components/Update/Update';
import Delete from'../components/Delete/Delete';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/user' element={<User/>}/>
        <Route path='/userList' element={<UserList/>}/>
        <Route path='/update' element={<Update/>}/>
        <Route path='/delete' element={<Delete/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
