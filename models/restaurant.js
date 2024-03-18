// models/restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  imageUrl: { type: String } // Add this line
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

