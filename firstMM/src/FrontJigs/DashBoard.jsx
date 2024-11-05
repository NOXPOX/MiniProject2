import React from 'react';
import { Menu, Zap, FileCog, PenTool } from 'lucide-react';
import './Dashboard.css'; // Import the CSS

const DashBoard = ({ isOpen, setIsOpen , onDashClick }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle between true and false
  };

  
  return (
    <>
      {!isOpen && (
        <div className="menu-strip" onClick={toggleMenu}>
          <Menu size={32} color="white" />
        </div>
      )}

      <div className={`container ${isOpen ? 'open' : ''}`}>
        <div className="row" onClick={toggleMenu}>
          <Menu size={32} color="black" />
          <h1>Dashboard</h1>
        </div>

        <div className="row" onClick={() => onDashClick('VisitMap')}>
          <Zap size={29} color="black" />
          <p className="other-map">VistMap</p>
        </div>

        <div className="row">

          <FileCog size={29} color="black" />
          <p className="other-map">EditMap</p>
        </div>

        <div className="row">
          <PenTool size={29} color="black" />
          <p className="other-map">Notes</p>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
