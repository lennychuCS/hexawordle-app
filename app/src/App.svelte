<script>
	import { data } from './data.js';
	let fullWordArray = data.split(',');
	let randomNum = Math.floor(Math.random() * fullWordArray.length);
	let correctWord = fullWordArray[randomNum].toUpperCase();
	//console.log(correctWord);
	let currentGuess = 0;
	let currentLetter = 0;
	let guesses = [];

	for(let i = 0; i < 7; i++){
		guesses.push({ id: i, text: ['','','','','',''], vsCorrect:['','','','','',''] })
	}

	document.addEventListener('keydown', function(event) {
    	let key = event.key.toUpperCase(); // "a", "1", "Shift", etc.

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
		
		function checkValidWord(){
			let word = guesses[currentGuess].text.join('').toLowerCase();
			
			if(data.includes(word)){
				return true;
			}
			return false;
		}

		function checkLetters(){
			for(let i = 0; i<6; i++){
				if(guesses[currentGuess].text[i]==correctWord.charAt(i)){
					guesses[currentGuess].vsCorrect[i] = 'F';
				} else if (correctWord.includes(guesses[currentGuess].text[i])){
					guesses[currentGuess].vsCorrect[i] = 'P';
				}
			}
		}

	});

</script>

<header>
	<h1>Welcome to Wor6le!</h1>
	<p>Wordle with six letter words!</p>
	<p>Your guesses lie below.</p>
</header>



<svg id='guessBoxes' width='250px' viewBox='0 0 130 160'>
	{#each [0, 1, 2, 3, 4, 5] as x}
		{#each [0, 1, 2, 3, 4, 5, 6] as y}
			{#if guesses[y].vsCorrect[x] == 'F'}
				<rect width="20" height="20" x={x*22} y={y*22} class='letterBoxFull'/>
			{:else if guesses[y].vsCorrect[x] == 'P'}
				<rect width="20" height="20" x={x*22} y={y*22} class='letterBoxPartial'/>
			{:else}
				<rect width="20" height="20" x={x*22} y={y*22} class='letterBoxWrong'/>
			{/if}
			<text x={x*22+5} y={y*22+15}>{guesses[y].text[x]}</text>
		{/each}
	{/each}
</svg>

<main>
	{#if currentGuess==7}
		<p>You unfortunatly did not guess the word. It was {correctWord}. Thank you for playing!</p>
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

	.letterBoxWrong {
		stroke: #000000;
		fill: #D8D8D8;
		stroke-width: 1px;
	}

	@media (min-width: 500px) {
		main {
			max-width: none;
		}
	}
</style>