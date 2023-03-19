const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rotas = require('./routers/rotas');

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

app.use((req, res) => {
    res.status(404).json({ error: 'page not found' });
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('API is running PORT: ' + PORT + ' ');
});