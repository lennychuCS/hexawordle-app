<script>
	//Imports
	import PseudoKeyboard from './PseudoKeyboard.svelte'; //Keyboard at bottom of screen
	import * as words from './words.json'; //Contains guessable words and word pool for hexawordle
	import * as kps from './keyProcesser.js';
	import { guessData, allLetters, correctWord, currentLetter, currentGuess, lastKey} from './stores.js';

	//Set up variables
	let hardWordChance = 0.05;
	chooseRightWord(hardWordChance);

	// Frontend bullshit for grid
	let boxThickness = 1;
	let boxLength = 20;
	let padding = 2;
	let lettersGrid = {
		x: boxThickness*12 + boxLength*6 + padding*5 - 8,
		y: boxThickness*14 + boxLength*7 + padding*6 - 8
	};
	
	//Listen for keyboard input on the whole page
	document.addEventListener('keydown', function(event) {
    	lastKey.set(event.key.toUpperCase()); // "a", "1", "Shift", etc.
		kps.processKey($lastKey, $guessData, $correctWord, $currentLetter, $currentGuess, $allLetters);
		event.target.blur();
	});

	function chooseRightWord(hwc){
		let possibleWords = words.commonWords.split(',');
		if(Math.floor(Math.random() * (1/hwc)) == 1){
			possibleWords = words.hardWords.split(',');
		}
		let randomNum = Math.floor(Math.random() * possibleWords.length);
		correctWord.set(possibleWords[randomNum].toUpperCase());
		
		if(words.testWord != ""){
			correctWord.set(words.testWord.toUpperCase());
		}

		kps.initGame();
	}	

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

<head>
	<meta charset="UTF-8">
	<meta name="description" content="Hexawordle">
	<meta name="keywords" content="Wordle, Hexawordle, Lennychu, Game">
	<meta name="author" content="Eden S.">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  </head>

<div id="navBar" class="navBar">
	<button id='newWord'
		class='button'
		type='button'
		on:click={(_) => chooseRightWord(hardWordChance)}
		style='grid-row-start: 1; grid-row-end: 2;'>
		Get New Word</button>

	<button id='newHardWord'
		class='button nhwButton'
		type='button'
		on:click={(_) => chooseRightWord(0.9)}
		style='grid-row-start: 2; grid-row-end: 3;'>
		Get New Word (Hard)</button>
</div>

<header>
	<h1 id=welcome>Welcome to Hexawordle!</h1>
	<p>Wordle with six letter words!</p>
	<p>Your guesses lie below.</p>
</header>

<!-- Draw grid for guesses and guessed letters -->

<svg id='guessBoxes' width='250px' viewBox='0 0 {lettersGrid.x} {lettersGrid.y}'>
	{#each [0, 1, 2, 3, 4, 5] as col}
		{#each [0, 1, 2, 3, 4, 5] as row}
			{#each [padding + col*22] as x}
				{#each [padding + row*22] as y}
					{#if row >= $currentGuess}
						<rect width="20" height="20" {x} {y} class='box letterBoxUnanswered'/>
					{:else}
						<rect width="20" height="20" {x} {y} class='box {colorOf($guessData[row].vsCorrect[col])}'/>
					{/if}
						<text x={x+boxLength/2} y={y+boxLength/2+2} dominant-baseline="middle" text-anchor="middle">{$guessData[row].text[col]}</text>
				{/each}
			{/each}
		{/each}
	{/each}
</svg>

<PseudoKeyboard allLetters={$allLetters}/>

<main>
	{#if kps.gameWon == false && $currentGuess == 6}
		<p>You unfortunately did not guess the word. It was {$correctWord}. Thank you for playing!</p>
	{:else if kps.gameWon == true}
		<p>Congratulations! You got it in {$currentGuess} guesses!</p>
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

	.navBar{
		display: grid;
		grid-template-columns: 1;
		grid-template-rows: repeat(2, 100px);
		gap: 10px;
		height: 210px;
		width: 100px;
		float: right;
		position: absolute;
		top: 20%;
		right: 0px;
		background-color: rgba(200,200,200,0.7);
		padding: 20px;
	}

	.button {
    	border: 1px solid #000000;
		color: #000000;
		padding: 2px 2px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 1px 1px;
		cursor: pointer;
		transition-duration: 0.4s;
		background-color: #ccc;
  	}

	.nhwButton {
		background-color: #AA0000;
	}

	.box {
		stroke: #000000;
		stroke-width: 1px;
		transition: fill 1s ease;
	}

	.letterBoxFull {
		fill: #0bb819;
	}

	.letterBoxPartial {
		fill: #e7e421;
	}

	.letterBoxUnanswered {
		fill: #ccc;
	}

	.letterBoxWrong {
		fill: #999;
	}

	@media (min-width: 500px) {
		main {
			max-width: none;
		}
	}
</style>