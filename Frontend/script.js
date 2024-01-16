

document.addEventListener('DOMContentLoaded', () => {
    
    getHighscores();
  });
  
  
  function getHighscores() {
    fetch('/api/highscore')
      .then(response => response.json())
      .then(highscores => {
        
        const highscoreList = document.getElementById('highscore-list');
        highscoreList.innerHTML = '';
  
        highscores.forEach((entry, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score} poäng`;
          highscoreList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching highscores:', error));
  }
  
  
  const choices = document.querySelectorAll('.choice-btn');
  choices.forEach(choice => {
    choice.addEventListener('click', () => {
      const playerChoice = choice.dataset.choice;
     
      handleGame(playerChoice);
    });
  });
  
 
  function handleGame(playerChoice) {
  
    fetch('/api/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerChoice }),
    })
      .then(response => response.json())
      .then(result => {
     
        updateUI(result);
      })
      .catch(error => console.error('Error playing the game:', error));
  }
  
  
  function updateUI(result) {
    const resultElement = document.getElementById('game-result');
    resultElement.textContent = result.message;
  
  }
  