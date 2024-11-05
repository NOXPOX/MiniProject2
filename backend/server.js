// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/MMDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

//UserSchema

const User = require("./User_info");
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // User found, respond with success
      res.json({ 
        username: user.username,
        success: true, 
        message: 'UserPresent', 
        exist: true,
        cards: user.cards 
      });
    } else {
      // User not found, send error response for incorrect credentials
       
      res.status(401).json({ success: false, message: 'Invalid username or password', exist: false });
    }
  } catch (error) {
    // Internal server error
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/cards/add', async (req, res) => {
  const { username, card } = req.body; 

  try {
    const user = await User.findOne({ username });
    if (user) {
      user.cards.push(card); 
      await user.save(); // Saved the updated user document
      res.json({ success: true, cards: user.cards });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/cards/load', async (req, res) => {
  const { username } = req.body; 

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json({ success: true, cards: user.cards });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.post('/api/cards/delete', async (req, res) => {
  const { username, cards } = req.body; 

  try {
    const user = await User.findOne({ username });
    if (user) {
      user.cards = cards; 
      await user.save(); 
      res.json({ success: true, cards: user.cards }); 
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/saveMindMap', async (req, res) => {
  const { userName, cardTitle, nodes, edges } = req.body; 
  console.log("Incoming data:", req.body);

  try {
    // Find the user
    const user = await User.findOne({ username: userName });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    //Find the Card title
    const card = user.cards.find(card => card.title === cardTitle);
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }

    
    card.userMapNode = nodes; 
    card.userMapEdge = edges;
    await user.save(); 

    console.log("Updated userMapNode:", card.userMapNode);
    res.json({ success: true, cards: user.cards });
  } catch (error) {
    console.error("Error updating mind map:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/loadMindMap', async (req, res) => {
  const { userName, cardTitle } = req.body; 
  try {
    const user = await User.findOne({ username: userName });
    
    if (user) {
      const card = user.cards.find(card => card.title === cardTitle);
      if (card) {
        res.json({
          success: true,
          nodes: card.userMapNode, 
          edges: card.userMapEdge, 
        });
      } else {
        res.status(404).json({ success: false, message: 'Card not found' });
      }
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


