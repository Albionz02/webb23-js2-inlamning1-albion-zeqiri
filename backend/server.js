const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get('/api/highscore', (req, res) => {
  const highscores = getHighscores();
  res.json(highscores);
});


app.post('/api/highscore', (req, res) => {
  const { name, score } = req.body;
  updateHighscore(name, score);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


function getHighscores() {
  const data = fs.readFileSync('highscores.json');
  return JSON.parse(data);
}

function updateHighscore(name, score) {
  const highscores = getHighscores();
  highscores.push({ name, score });
  highscores.sort((a, b) => b.score - a.score);
  highscores.splice(5); 
  fs.writeFileSync('highscores.json', JSON.stringify(highscores));
}
