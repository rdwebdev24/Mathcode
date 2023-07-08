import { BrowserRouter, Routes , Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './components/Landing/Login';
import { useState } from 'react';
import { Landing } from './components/Landing/Landing';
import { UnderConst } from './components/Landing/UnderConst';
import { Questionpage } from './components/main-web/Questionpage';
import { Register } from './components/Landing/Register';
import { Main } from './components/main-web/Main';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='register' element={<Register/>} />
          <Route path='404' element={<UnderConst/>} />
          <Route path='login' element={<Login/>} />
          <Route path='question' element={<Questionpage />} />
          <Route path='problems/all' element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
