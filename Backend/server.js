const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const PORT = process.env.PORT || 4000;

const app = express();

// Use cors middleware and allow cross-origin requests from your client-side application
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/images', imageRoutes);
require('./config/db').connect();

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});