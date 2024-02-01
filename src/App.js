import "./App.css";
import Home from './components/home';
import Result from './components/result';
import Addnew from './components/addnew';
import CustomWebcam from './components/webcam';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/result' element={<Result/>}></Route>
      <Route path='/addnew' element={<Addnew/>}></Route>
      <Route path='/webcam' element={<CustomWebcam/>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
