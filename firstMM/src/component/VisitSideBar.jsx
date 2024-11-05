import React from 'react';
import { X } from 'lucide-react'; // Import the close icon
import './VisitSideBar.css';

const VisitSideBar = ({ onClose, selectedNode }) => {
    if (!selectedNode) return null; // Early return if no node is selected
  
    const { data } = selectedNode; // Access data property directly
    const { title, description, links } = data; // Destructure the properties you need
    console.log("title : ",title ,"description : ", description ,"links :" ,links);
    return (
      <div className='SideBar'>
        <button className="close-button" onClick={onClose}>
        </button>

        
        <div className="title-description">
          <h2>{title}</h2>
          <p className='description-class'>{description}</p>
          <div className="links">
            {links && links.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label || link.url} {/* Assuming each link object has a label */}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
export default VisitSideBar;
