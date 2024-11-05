import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.css';

const Cards = ({ userName }) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');

  const TITLE_WORD_LIMIT = 10;
  const DESC_WORD_LIMIT = 50;

  // Function to load cards for the user
  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cards/load', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName }),
      });

      const data = await response.json();
      if (data.success) {
        setCards(data.cards); // Load the cards from the server
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Call loadData on component mount
  useEffect(() => {
    loadData();
  }, []);

  const handleAddCardClick = () => {
    setShowModal(true);
  };

  const handleSaveCard = async () => {
    if (!newCardTitle.trim() || !newCardDesc.trim()) {
      alert('Please provide both a title and a description.');
      return;
    }

    const titleWords = newCardTitle.trim().split(/\s+/).length;
    const descWords = newCardDesc.trim().split(/\s+/).length;

    if (titleWords > TITLE_WORD_LIMIT) {
      alert(`Title should not exceed ${TITLE_WORD_LIMIT} words.`);
      return;
    }

    if (descWords > DESC_WORD_LIMIT) {
      alert(`Description should not exceed ${DESC_WORD_LIMIT} words.`);
      return;
    }

    try {
      const newCard = { title: newCardTitle, description: newCardDesc };
      const response = await fetch('http://localhost:5000/api/cards/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, card: newCard }),
      });

      const data = await response.json();
      if (data.success) {
        setCards(data.cards); // Update cards after adding new one
        setShowModal(false);
        setNewCardTitle('');
        setNewCardDesc('');
      } else {
        alert('Error adding card');
      }
    } catch (error) {
      console.log('Error adding card:', error);
    }
  };

  const handleDeleteCard = async (index) => {
    console.log("The Index is :", index);
    try {
      // Create a new array with the card removed
      const updatedCards = cards.filter((_, i) => i !== index);
      
      // Send the updated cards to the correct endpoint
      const response = await fetch('http://localhost:5000/api/cards/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, cards: updatedCards }),
      });
  
      const data = await response.json();
      if (data.success) {
        setCards(data.cards); // Update local state with the cards from the server
      } else {
        alert('Error deleting card');
      }
    } catch (error) {
      console.log('Error deleting card:', error);
    }
  };
  
  const handleCardClick = (cardTitle) => { // Accept cardTitle as a parameter
    console.log(userName); // Make sure userName has a valid value
    console.log(cardTitle); // Optional: log the card title for debugging
    navigate('/mindmap', { state: { userName, cardTitle } }); // Passing userName and cardTitle in the state
};

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div key={index} onClick={() => handleCardClick(card.title)} className="card custom-card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCard(index);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <div className="card add-card-button" onClick={handleAddCardClick}>
        <span>+ Add Card</span>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Card</h3>
            <input
              type="text"
              placeholder="Card Title (max 10 words)"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            <textarea
              placeholder="Card Description (max 50 words)"
              value={newCardDesc}
              onChange={(e) => setNewCardDesc(e.target.value)}
            />
            <button onClick={handleSaveCard}>Save Card</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
