const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Restaurant = require('./models/restaurant');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // This will save files to a folder named "uploads"


const app = express();
app.use(cors());
app.use(express.json()); // Allows us to parse JSON
app.use('/uploads', express.static('uploads'));


const mongoDBURI = 'myuri'

// mongoose.connect(mongoDBURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

mongoose.connect(mongoDBURI, {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // Route to add a new restaurant
// app.post('/restaurants', async (req, res) => {
//   try {
//     const restaurant = new Restaurant(req.body);
//     await restaurant.save();
//     res.status(201).send(restaurant);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Route to add a new restaurant
// app.post('/restaurants', async (req, res) => {
//   try {
//           const restaurant = new Restaurant({
//                   ...req.body,
//                   imageUrl: req.file.path
//           });
//     await restaurant.save();
//     res.status(201).send(restaurant);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });


app.post('/restaurants', upload.single('image'), async (req, res) => {
  try {
    // Correctly combine req.body and imageUrl
    const restaurant = new Restaurant({
      ...req.body,
      imageUrl: req.file.path // Assuming 'image' is the name of the field in your form
    });
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(400).send(error);
  }
});



// Route to update likes/dislikes
app.patch('/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });
    if (!restaurant) {
      return res.status(404).send();
    }
    res.send(restaurant);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Add this code to server.js

// Fetch all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});




// mongodb+srv://guevarajames:<password>@cluster0.dpd7eyk.mongodb.net/


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://guevarajames:EYfIXQxhBRmcSrj9@cluster0.dpd7eyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// 
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// 
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

