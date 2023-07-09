import { BrowserRouter, Routes , Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './components/Landing/Login';
import { Landing } from './components/Landing/Landing';
import { Questionpage } from './components/main-web/Questionpage';
import { Register } from './components/Landing/Register';
import { Main } from './components/main-web/Main';
import { PageNotFound } from './PageNotFound';
import { UnderConst } from './components/main-web/UnderConst';

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
          <Route path='underconstruction' element={<UnderConst/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
