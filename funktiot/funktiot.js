const input = document.querySelector('input');       
const output = document.querySelector('#hidden-word'); 
const span = document.querySelector('#guess-count'); 

const words = [
    "programming", 
    "javascript", 
    "database", 
    "markup", 
    "framework", 
    "variable", 
    "library"
];

let randomizeWord = ''; 
let maskedWord = '';
let guessCount = 0; 

const newGame = () => { 
    randomizeWord = words[Math.floor(Math.random() * words.length)]; 
    maskedWord = "*".repeat(randomizeWord.length);
    output.innerHTML = maskedWord; 
    guessCount = 0; 
    span.innerHTML = guessCount;
}

const updateGuessCount = () => {
    guessCount++;
    span.innerHTML = guessCount; 
}

const replaceFoundChars = (guess) => { 
    let newMaskedWord = maskedWord.split('');
    for (let i = 0; i < randomizeWord.length; i++) { 
        if (randomizeWord[i] === guess) {
            newMaskedWord[i] = guess; 
        }
    }
    maskedWord = newMaskedWord.join(''); 
    output.innerHTML = maskedWord; 
}

const win = () => {
    alert(`You have guessed right! The word is "${randomizeWord}". You made ${guessCount} guesses.`);
    newGame(); 
}

newGame();

input.addEventListener('keypress', (e) => { 
    if (e.key === 'Enter') { 
        e.preventDefault();
        const guess = input.value.toLowerCase(); 

        if (guess.length === 1) { 
            updateGuessCount(); 
            replaceFoundChars(guess); 
            
            if (maskedWord === randomizeWord) {
                win();
            }
        } else if (guess === randomizeWord) {
            guessCount++; 
            win(); 
        } else {
            alert("You guessed wrong! Please guess a single letter or the entire word.");
        }
        
        input.value = ''; 
    }
});