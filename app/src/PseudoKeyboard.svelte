<script>
	import { guessData, correctWord, currentLetter, currentGuess } from './stores.js';
	import * as kps from './keyProcesser.js';

	export let allLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'; //For Keyboard

	//Unanswered, Wrong, Partial, Full
	let stateKey = {
		'U' : 0,
		'W' : 1,
		'P' : 2,
		'F' : 3
	};

	function onButtonClick(text){
		kps.processKey(text, $guessData, $correctWord, $currentLetter, $currentGuess, allLetters);
	}

	function colorOf(letter){
		let bestState = "U";
		let zies = $guessData.length;
		for(let z = 0; z<zies; z++){
			for(let m = 0; m<6; m++){
				if($guessData[z].text[m] == letter){
					if(stateKey[$guessData[z].vsCorrect[m]]>stateKey[bestState]){
						bestState=$guessData[z].vsCorrect[m];
					} else if ($guessData[z].vsCorrect[m] == ''){
						bestState='W';
					}
				}
			}
		}
		//console.log("Letter ", letter, " was ", bestState);
		
		switch(bestState) {
			case 'U': return 'buttonUnanswered';
			case 'F': return 'buttonFull';
			case 'P': return 'buttonPartial';
			default: return 'buttonWrong';
		}
	}
</script>

<div id="PseudoKeyboard" class="container">
	{#each Array(26) as _, i}
		{#if i < 10}
			<button id={allLetters[i]}
					class='button {colorOf(allLetters[i])}' 
					on:click={(_) => onButtonClick(allLetters[i])}
					style='grid-row-start: 1; grid-row-end: 2;'>
					{allLetters[i]}</button>
		{:else if i < 19}
			<button id={allLetters[i]}
					class='button {colorOf(allLetters[i])}'
					on:click={(_) => onButtonClick(allLetters[i])}
					style='grid-row-start: 2; grid-row-end: 3;'>
					{allLetters[i]}</button>
		{:else}
			<button id={allLetters[i]}
					class='button {colorOf(allLetters[i])}'
					on:click={(_) => onButtonClick(allLetters[i])}
					style='grid-row-start: 3; grid-row-end: 4;'>
					{allLetters[i]}</button>
		{/if}
	{/each}
	
	<button id='BACKSPACE'
			class='button buttonUnanswered'
			on:click={(_) => onButtonClick('BACKSPACE')}
			style='grid-column-start: 10; grid-column-end: 11; grid-row-start: 2; grid-row-end: 3;'>
			←</button>
	<button id='ENTER'
			class='button buttonUnanswered'
			on:click={(_) => onButtonClick('ENTER')}
			style='grid-column-start: 8; grid-column-end: 11; grid-row-start: 3; grid-row-end: 4;'>
			ENTER</button>

</div>

<style>

	.container{
		display: grid;
		grid-template-columns: repeat(10, 9%);
		grid-template-rows: repeat(3, 30%);
		gap: 1%;
		height: 200px;
		width: 60%;
		margin-left:auto;
		margin-right:auto;
	}

	.button {
    	border: 1px solid #000000;
		color: #000000;
		padding: 10% 10%;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 100%;
		margin: 4px 2px;
		cursor: pointer;
  	}

	.buttonFull{
		background-color: #0bb819;
	}

	.buttonPartial{
		background-color: #e7e421;;
	}

	.buttonWrong{
		background-color: #999;
	}

	.buttonUnanswered{
		background-color: #ccc;;
	}

</style>