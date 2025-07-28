const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL, 
  'http://localhost:5173',  
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Book Management API! The server is running.' });
});


app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
  process.exit(1); 
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB.');
    // app.listen(PORT, () => {
      app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

module.exports = app;
