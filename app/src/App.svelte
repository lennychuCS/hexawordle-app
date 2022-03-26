<script>
	import { allWords } from './allWords.js';
	import { commonWords } from './commonWords.js';
	let commonWordsArray = commonWords.split(',');
	let randomNum = Math.floor(Math.random() * commonWordsArray.length);
	let correctWord = commonWordsArray[randomNum].toUpperCase();
	let currentGuess = 0;
	let currentLetter = 0;
	let guesses = [];
	let gameWon = false;

	// Frontend bullshit
	let boxThickness = 1;
	let boxLength = 20;
	let padding = 2;
	let lettersGrid = {
		x: boxThickness*12 + boxLength*6 + padding*5,
		y: boxThickness*14 + boxLength*7 + padding*6
	};
console.log(correctWord);

	for(let i = 0; i < 7; i++){
		guesses.push({ id: i, text: ['','','','','',''], vsCorrect:['','','','','',''] })
	}

	document.addEventListener('keydown', function(event) {
    	let key = event.key.toUpperCase(); // "a", "1", "Shift", etc.
		if(!gameWon){
			if(key === 'ENTER'){
				if(currentLetter==6){
					if(checkValidWord()){
						checkLetters();
						currentGuess += 1;
						currentLetter = 0;
					} else {
						alert('Not a Valid Word!');
					}
				} else {
					alert('Your word is not long enough!');
				}
			} else if(currentLetter != 0 && key == 'BACKSPACE') {
				guesses[currentGuess].text[currentLetter-1] = '';
				currentLetter -= 1;
			} else if(key.length == 1 && currentLetter<6 && key.toUpperCase() != key.toLowerCase()){
				guesses[currentGuess].text[currentLetter] = key;
				currentLetter += 1;
			}
		}
		
		function checkValidWord(){
			let word = guesses[currentGuess].text.join('').toLowerCase();
			
			return allWords.includes(word);
		}

		function checkLetters(){
			let lettersLeft = correctWord.split('');
			for(let i = 0; i < 6; i++) {
				if(guesses[currentGuess].text[i] == lettersLeft[i]) {
					guesses[currentGuess].vsCorrect[i] = 'F';
					lettersLeft[i] = '';
				}
			}
			for(let i = 0; i<6; i++){
				if (lettersLeft[i]!='' && correctWord.includes(guesses[currentGuess].text[i]) && lettersLeft.includes(guesses[currentGuess].text[i])){
					guesses[currentGuess].vsCorrect[i] = 'P';
					lettersLeft[lettersLeft.indexOf(guesses[currentGuess].text[i])] = '';
				}
			}

			for(let i = 0; i<6; i++){
				if (guesses[currentGuess].vsCorrect[i] != 'F'){
					gameWon = false;
					break;
				}
				gameWon = true;
			}

		}
	});

	function colorOf(cond){
		switch(cond) {
			case 'F': return 'letterBoxFull';
			case 'P': return 'letterBoxPartial';
			default: return 'letterBoxWrong'
		}
	}

</script>

<header>
	<h1>Welcome to Wor6le!</h1>
	<p>Wordle with six letter words!</p>
	<p>Your guesses lie below.</p>
</header>



<svg id='guessBoxes' width='250px' viewBox='0 0 {lettersGrid.x} {lettersGrid.y}'>
	{#each [0, 1, 2, 3, 4, 5] as col}
		{#each [0, 1, 2, 3, 4, 5, 6] as row}
			{#each [padding + col*22] as x}
				{#each [padding + row*22] as y}
					{#if row >= currentGuess}
						<rect width="20" height="20" {x} {y} class='letterBoxUnanswered'/>
					{:else}
						<rect width="20" height="20" {x} {y} class={colorOf(guesses[row].vsCorrect[col])}/>
					{/if}
					<text x={x+boxLength/2} y={y+boxLength/2+2} dominant-baseline="middle" text-anchor="middle">{guesses[row].text[col]}</text>
				{/each}
			{/each}
		{/each}
	{/each}
</svg>

<main>
	{#if gameWon == false && currentGuess == 7}
		<p>You unfortunately did not guess the word. It was {correctWord}. Thank you for playing!</p>
	{:else if gameWon == true}
		<p>Congradulations! You got it in {currentGuess} guesses!</p>
	{/if}
</main>


<style>
	header {
		text-align: center;
		padding: 4px;
		margin: 0;
	}
	
	main {
		text-align: center;
		padding: 1em;
		max-width: 400px;
		margin: 0 auto;
	}

	h1 {
		color: #f01ba9;
		text-transform: capitalize;
		font-size: 4em;
		font-weight: 100;
	}

	#guessBoxes{margin-left:auto; margin-right:auto; display:block;}

	.letterBoxFull {
		stroke: #000000;
		fill: #0bb819;
		stroke-width: 1px;
	}

	.letterBoxPartial {
		stroke: #000000;
		fill: #e7e421;
		stroke-width: 1px;
	}

	.letterBoxUnanswered {
		stroke: #000000;
		fill: #ccc;
		stroke-width: 1px;
	}

	.letterBoxWrong {
		stroke: #000000;
		fill: #999;
		stroke-width: 1px;
	}

	@media (min-width: 500px) {
		main {
			max-width: none;
		}
	}
</style>