import App from './App.svelte';
import Codes from './CountryCodes.json';

const theme = localStorage.getItem('theme');
const app = new App({
	target: document.body,
	props: {
		name: 'LANGSUNG-WA',
		numberCodes: Codes,
    dark: theme === 'dark'
	}
});

export default app;
