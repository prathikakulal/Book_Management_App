// // backend/server.js

// // Import necessary packages
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Import routes
// const bookRoutes = require('./routes/bookRoutes');

// // Load environment variables from .env file
// dotenv.config();

// // Initialize the Express application
// const app = express();

// // --- Middleware ---

// // Configure CORS to allow requests from your frontend
// // In production, you should restrict this to your frontend's actual domain
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite's default port
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse URL-encoded bodies (for form data)
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from a 'public' directory if you have one
// // app.use(express.static('public'));


// // --- API Routes ---

// // A simple test route to ensure the server is running
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the Book Management API!' });
// });

// // Use the book routes for any requests to /api/books
// app.use('/api/books', bookRoutes);


// // --- Database Connection ---

// const PORT = process.env.PORT || 5001;
// const MONGO_URI = process.env.MONGO_URI;

// // Check if MONGO_URI is provided
// if (!MONGO_URI) {
//   console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
//   process.exit(1); // Exit the application
// }

// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log('Successfully connected to MongoDB.');
//     // Start the server only after a successful database connection
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Database connection error:', err);
//     process.exit(1);
//   });

// // Export the app for testing purposes
// module.exports = app;

















// backend/server.js

// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const bookRoutes = require('./routes/bookRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// --- Middleware ---

// --- FIX: Enhanced CORS Configuration ---
// This setup explicitly allows your Vite frontend's origin.
const allowedOrigins = [
  process.env.FRONTEND_URL, // From your .env file
  'http://localhost:5173',  // Vite's default dev server
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
};

// Use the configured CORS middleware
app.use(cors(corsOptions));


// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---

// A simple test route to ensure the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Book Management API! The server is running.' });
});

// Use the book routes for any requests to /api/books
app.use('/api/books', bookRoutes);


// --- Database Connection ---

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI is provided
if (!MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
  process.exit(1); // Exit the application
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB.');
    // Start the server only after a successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

// Export the app for testing purposes
module.exports = app;
