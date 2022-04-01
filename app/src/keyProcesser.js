import {guessData, allLetters, currentGuess, currentLetter, lastKey} from './stores.js'; //Stored variable so other components can see.
import * as words from './words.json'; //Contains guessable words and word pool for hexawordle

export let guesses = [];
export let gameWon = false;

export function initGame(){
    guesses = [];
    gameWon = false;

    for(let i = 0; i < 6; i++){
        guesses.push({ id: i, text: ['','','','','',''], vsCorrect:['','','','','','']})
    }
    
    guessData.set(guesses);
    allLetters.set('QWERTYUIOPASDFGHJKLZXCVBNM');
    currentGuess.set(0);
    currentLetter.set(0);
}

export function processKey(key, guessDataReadonly, correctWord, letterNum, guessNum, lettersList){
    if(!gameWon){
        if(key === 'ENTER'){
            if(letterNum==6){
                if(checkValidWord(guessDataReadonly, guessNum)){
                    checkLetters(guessDataReadonly, correctWord, guessNum);
                    currentGuess.update(guess => {
                        allLetters.update(() => lettersList + guessNum);
                        
                        return guess + 1
                    })
                    currentLetter.set(0);
                } else {
                    alert('Not a Valid Word!');
                }
            } else {
                alert('Your word is not long enough!');
            }
        } else if(letterNum != 0 && key == 'BACKSPACE') {
            let tempGuessdata = guessDataReadonly;
            tempGuessdata[guessNum].text[letterNum - 1] = '';
            guessData.set(tempGuessdata);
            currentLetter.update(letter => letter - 1);
            
        } else if(key.length == 1 && letterNum<6 && key.toUpperCase() != key.toLowerCase()){
            let tempGuessdata = guessDataReadonly;
            tempGuessdata[guessNum].text[letterNum] = key;
            guessData.set(tempGuessdata);
            currentLetter.update(letter => letter + 1);
        }
    }
}

export function checkValidWord(guessDataReadonly, currentGuess){
    let word = guessDataReadonly[currentGuess].text.join('').toLowerCase();
    
    return (words.allWords.includes(word) || words.commonWords.includes(word) || words.hardWords.includes(word)); //Ensures word is guessable
}

export function checkLetters(guessDataReadonly, correctWord, currentGuess){
    let lettersLeft = correctWord.split('');

    for(let i = 0; i < 6; i++) {
        if(guessDataReadonly[currentGuess].text[i] == lettersLeft[i]) {
            let tempGuessdata = guessDataReadonly;
            tempGuessdata[currentGuess].vsCorrect[i] = 'F';
            guessData.set(tempGuessdata)
            lettersLeft[i] = '';
        }
    }

    for(let i = 0; i<6; i++){
        if (guessDataReadonly[currentGuess].vsCorrect[i] == '' && correctWord.includes(guessDataReadonly[currentGuess].text[i]) && lettersLeft.includes(guesses[currentGuess].text[i])){
            let tempGuessdata = guessDataReadonly;
            tempGuessdata[currentGuess].vsCorrect[i] = 'P';
            guessData.set(tempGuessdata)
            lettersLeft[lettersLeft.indexOf(guessDataReadonly[currentGuess].text[i])] = '';
        }
    }

    for(let i = 0; i<6; i++){
        if (guessDataReadonly[currentGuess].vsCorrect[i] != 'F'){
            gameWon = false;
            break;
        }
        gameWon = true;
    }

}