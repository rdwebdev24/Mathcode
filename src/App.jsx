import { BrowserRouter, Routes , Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { useState } from 'react';
import { Questionpage } from './components/Questionpage';
import { Landing } from './components/Landing';
import { UnderConst } from './components/UnderConst';
import { Main } from './components/Main';

function App() {

  const [user,setUser] = useState({});
  
  const [quesId,setQuesId] = useState(5);
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='register' element={<Register/>} />
          <Route path='404' element={<UnderConst/>} />
          <Route path='login' element={<Login/>} />
          <Route path='question' element={<Questionpage quesId={quesId}/>} />
          <Route path='problem-set/all' element={<Main setQuesId={setQuesId}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
