const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(express.json());  //Middleware to parse JSON bodies
// If missed this post put methods don't wor

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)});
  

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
})

const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
});
