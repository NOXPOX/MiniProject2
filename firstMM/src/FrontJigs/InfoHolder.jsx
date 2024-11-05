import React from 'react';
import './InfoHolder.css';
import Cards from './Cards';
import VisitMapPrev from '../component/VisitMapPrev';

const InfoHolder = ({ isOpen, activeView, cardData , username }) => { 
  console.log(username)
  console.log(activeView)
  return (
    <div className={`holder ${isOpen ? 'open' : 'closed'}`}>
      {activeView === 'home' && (
        <div className="home">
          <Cards userName = {username} /> 
        </div>
      )}
      {activeView === 'progress' && <div className="progress">Progress Content</div>}
      {activeView === 'about' && <div className="about">About Content</div>}
      {activeView === 'VisitMap' && <div className='visit-map-container'>
          <VisitMapPrev
            userName = {username}
          ></VisitMapPrev>
        
        </div>}


    </div>
  );
};

export default InfoHolder;
