// Import Vue and App Component
import { createApp } from 'vue';
import App from './App.vue';

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import Global CSS (optional, if you have global styles)
import './assets/global.css';

// Create and Mount Vue App
createApp(App).mount('#app');
