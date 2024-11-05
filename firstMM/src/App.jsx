import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MindMap from './MindMap';
import LoginPage from './FrontJigs/LoginPage';
import FrontPage from './FrontJigs/FrontPage';
import VisitMap from './component/VisitMap';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/front" element={<FrontPage />} />
        <Route path="/mindmap" element={<MindMap />} />
        <Route path = "/visitmap" element={<VisitMap />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
