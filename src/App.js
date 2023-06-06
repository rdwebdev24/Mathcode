import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { useState } from 'react';
import { Questionpage } from './components/Questionpage';
import { Landing } from './components/Landing';

function App() {
  const [quesId,setQuesId] = useState(5);
  const [problems,setproblems] = useState([]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Login/>} />
          <Route path='question' element={<Questionpage quesId={quesId} problems={problems}/>} />
          <Route path='problem-set/all' element={<Main setQuesId={setQuesId} setproblems={setproblems} problems={problems}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
