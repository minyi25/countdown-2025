const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/world-map', (req, res) => res.sendFile(__dirname + '/public/world-map.html'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
