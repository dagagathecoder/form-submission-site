require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const Form = mongoose.model('Form', formSchema);

// API Endpoint
app.post('/api/submit', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newForm = new Form({ name, email });
    await newForm.save();
    res.status(201).send('Form submitted successfully!');
  } catch (error) {
    res.status(500).send('Error submitting form.');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
