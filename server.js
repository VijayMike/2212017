const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/link');

dotenv.config();
const app = express();

const shortenerRoutes = require('./routes/shortener');

app.use(express.json());
app.use('/', shortenerRoutes);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/', linkRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));