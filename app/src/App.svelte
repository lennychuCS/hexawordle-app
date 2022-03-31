<script>
	//Imports
	import PseudoKeyboard from './PseudoKeyboard.svelte'; //Keyboard at bottom of screen
	import * as words from './words.json'; //Contains guessable words and word pool for hexawordle
	import * as kps from './keyProcesser.js';
	import { guessData, allLetters, correctWord, currentLetter, currentGuess } from './stores.js';

	//Set up variables
	let commonWordsArray = words.commonWords.split(',');
	let randomNum = Math.floor(Math.random() * commonWordsArray.length);
	correctWord.set(commonWordsArray[randomNum].toUpperCase());
	if(words.testWord != ""){
		correctWord = words.testWord.toUpperCase();
	}

	// Frontend bullshit for grid
	let boxThickness = 1;
	let boxLength = 20;
	let padding = 2;
	let lettersGrid = {
		x: boxThickness*12 + boxLength*6 + padding*5 - 8,
		y: boxThickness*14 + boxLength*7 + padding*6 - 8
	};

	kps.initGuessData();
	
	//Listen for keyboard input on the whole page
	document.addEventListener('keydown', function(event) {
    	let key = event.key.toUpperCase(); // "a", "1", "Shift", etc.
		kps.processKey(key, $guessData, $correctWord, $currentLetter, $currentGuess, $allLetters);
	});

	//Convert guess code into box style class
	function colorOf(cond){
		switch(cond) {
			case 'F': return 'letterBoxFull';
			case 'P': return 'letterBoxPartial';
			default: return 'letterBoxWrong';
		}
	}

</script>

<!-- HTML starts below! -->

<header>
	<h1>Welcome to Hexawordle!</h1>
	<p>Wordle with six letter words!</p>
	<p>Your guesses lie below.</p>
</header>

<!-- Draw grid for guesses and guessed letters -->

<svg id='guessBoxes' width='250px' viewBox='0 0 {lettersGrid.x} {lettersGrid.y}'>
	{#each [0, 1, 2, 3, 4, 5] as col}
		{#each [0, 1, 2, 3, 4, 5, 6] as row}
			{#each [padding + col*22] as x}
				{#each [padding + row*22] as y}
					{#if row >= $currentGuess}
						<rect width="20" height="20" {x} {y} class='letterBoxUnanswered'/>
					{:else}
						<rect width="20" height="20" {x} {y} class={colorOf($guessData[row].vsCorrect[col])}/>
					{/if}
						<text x={x+boxLength/2} y={y+boxLength/2+2} dominant-baseline="middle" text-anchor="middle">{$guessData[row].text[col]}</text>
				{/each}
			{/each}
		{/each}
	{/each}
</svg>

<PseudoKeyboard allLetters={$allLetters}/>

<main>
	{#if kps.gameWon == false && $currentGuess == 7}
		<p>You unfortunately did not guess the word. It was {correctWord}. Thank you for playing!</p>
	{:else if kps.gameWon == true}
		<p>Congradulations! You got it in {$currentGuess} guesses!</p>
	{/if}
</main>

<!-- CSS starts below! -->

<style>
	header {
		text-align: center;
		padding: 2px;
		margin: 0;
		line-height: 0.8;
	}
	
	main {
		text-align: center;
		padding: 1em;
		max-width: 400px;
		margin: 0 auto;
		line-height: 0.8;
	}

	h1 {
		color: #f01ba9;
		text-shadow: 2px 2px 3px #000000;
		text-transform: capitalize;
		font-size: 3em;
		font-weight: 400;
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