import React, {useState, Suspense, lazy} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(()=>import('./pages/auth/login'));
const Regis = lazy(()=>import('./pages/auth/regis'));
const Chat = lazy(()=>import('./pages/chat/chat'));

function App() {
  const [userAuth, setUserAuth] = useState(window.localStorage.getItem("userAuthTokin"))
  return (
    <Suspense fallback={<>Loading</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={
            (userAuth)? 
              <Chat setUserAuth={setUserAuth}/>: 
              <Login setUserAuth={setUserAuth}/>
          }/>
          <Route path="/" element={
             (userAuth)? 
              <Chat setUserAuth={setUserAuth}/>: 
              <Login setUserAuth={setUserAuth}/>
            }/>
          <Route path="/regis" element={
            (userAuth)? 
            <Chat setUserAuth={setUserAuth}/>: 
            <Regis setUserAuth={setUserAuth}/>
          }/>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
