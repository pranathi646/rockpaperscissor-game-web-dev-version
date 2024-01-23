let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying){
      intervalID = setInterval(function(){
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
      document.querySelector('.autoplay').innerHTML = 'Stop';
    }else{
      clearInterval(intervalID);
      isAutoPlaying = false;
      document.querySelector('.autoplay').innerHTML = 'Auto play';   
    }
  
}


document.body.addEventListener('keydown',(event) => {
  if (event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key ==='s'){
    playGame('scissors');
  }else if(event.key === 'Backspace'){
    score.wins = 0; score.losses=0; score.ties=0;
      localStorage.removeItem('score');
      updateScoreElement();
        alert(`Score was reset.
Wins : ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
  }else if(event.key === 'a'){
    autoPlay();
  }
});

document.querySelector('.autoplay').addEventListener('click', ()=> {autoPlay();});

function playGame(playerMove){
  const computerMove= pickComputerMove();

  let result = '';
  
  if (playerMove === 'scissors'){
   if (computerMove === 'scissors'){
    result = 'TIE.';
   }
   else if( computerMove === 'rock'){
     result = 'YOU LOSE.';
   }
   else if( computerMove === 'paper'){
     result = ' YOU WIN.';
   }
  }
  else if(playerMove === 'rock'){
    if (computerMove === 'rock'){
      result = 'TIE.';
    }
    else if( computerMove === 'paper'){
      result = 'YOU LOSE.';
    }
    else if( computerMove === 'scissors'){
      result = ' YOU WIN.';
    }
  }
  else if(playerMove === 'paper'){
    if (computerMove === 'paper'){
        result = 'TIE.';
    }
    else if( computerMove === 'scissors'){
      result = 'YOU LOSE.';
    }
    else if( computerMove === 'rock'){
      result = ' YOU WIN.';
    }         
  }

  if (result === ' YOU WIN.'){
    score.wins += 1;
  }else if (result === 'YOU LOSE.'){
    score.losses += 1;
  }else if (result === 'TIE.'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML =`You &nbsp &nbsp <img src="images/${playerMove} img.png" class="result-icon"> &nbsp &nbsp &nbsp <img src="images/${computerMove} img.png" class="result-icon"> &nbsp &nbsp  Computer`;


}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1/3) {computerMove= 'rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3) { computerMove = 'paper';
  }
  else if (randomNumber >= 2/3 && randomNumber < 1) { computerMove = 'scissors';
  }
  return computerMove;

}