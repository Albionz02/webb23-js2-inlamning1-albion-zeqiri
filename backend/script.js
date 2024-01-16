
fetch('/api/highscore')
  .then(response => response.json())
  .then(highscores => {
  
  })
  .catch(error => console.error('Error fetching highscores:', error));


function sendScoreToBackend(name, score) {
  fetch('/api/highscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, score }),
  })
  .then(response => {
    if (response.ok) {
      
    } else {
      console.error('Error sending score to backend:', response.status);
    }
  })
  .catch(error => console.error('Error sending score to backend:', error));
}
