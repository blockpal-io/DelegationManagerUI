import './app.css';
import App from './App.svelte';

const target = document.getElementById('app');
if (!target) throw new Error('Could not find app element');

const app = new App({
<<<<<<< Updated upstream
  target: document.getElementById('root')
=======
  target,
>>>>>>> Stashed changes
});

export default app;
