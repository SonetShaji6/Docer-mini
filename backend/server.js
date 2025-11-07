const express = require('express');
const mongoose = require('mongoose');

let cors;
try {
  cors = require('cors');
} catch (err) {
  console.warn("Warning: 'cors' module not found. Using a simple fallback CORS middleware. Run 'npm install cors' to install the package.");
  cors = null;
}

const app = express();

app.use(cors ? cors() : (req, res, next) => {
  // minimal fallback CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

const mongoUri = 'process.env.MONGO_URL';
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend! and Hai' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
