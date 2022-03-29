<script>
	import { guessData } from './stores.js';

	export let allLetters= 'QWERTYUIOPASDFGHJKLZXCVBNM'; //For Keyboard

	//Unanswered, Wrong, Partial, Full
	let stateKey = {
		'U' : 0,
		'W' : 1,
		'P' : 2,
		'F' : 3
	};

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
		//console.log(bestState);
		
		switch(bestState) {
			case 'U': return 'letterBoxUnanswered';
			case 'F': return 'letterBoxFull';
			case 'P': return 'letterBoxPartial';
			default: return 'letterBoxWrong';
		}
	}
</script>

<main>
	<svg id='PsedoKeyboard' width="350px" viewbox='0 0 220 66'>
		{#each Array(26) as _, i}
			{#if i < 10}
				<rect width="20" height="20" x={i*22} y='0' class={colorOf(allLetters[i])}/>
				<text x={i*22 + 10} y={12} dominant-baseline="middle" text-anchor="middle">{allLetters[i]}</text>
			{:else if i < 19}
				<rect width="20" height="20" x={(i-10)*22+11} y='22' class={colorOf(allLetters[i])}/>
				<text x={(i-10)*22 + 10 + 11} y={34} dominant-baseline="middle" text-anchor="middle">{allLetters[i]}</text>
			{:else}
				<rect width="20" height="20" x={(i-19)*22+33} y='44' class={colorOf(allLetters[i])}/>
				<text x={(i-19)*22 + 10 + 33} y={56} dominant-baseline="middle" text-anchor="middle">{allLetters[i]}</text>
			{/if}
		{/each}
	</svg>
</main>

<style>

    #PsedoKeyboard{margin-left:auto; margin-right:auto; display:block; overflow:visible;}

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

</style>