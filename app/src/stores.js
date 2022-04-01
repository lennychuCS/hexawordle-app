import { writable } from 'svelte/store';

export const guessData = writable([]);
export const correctWord = writable('');
export const allLetters = writable('QWERTYUIOPASDFGHJKLZXCVBNM')
export const currentGuess = writable(0);
export const currentLetter = writable(0);
export const lastKey = writable('');
