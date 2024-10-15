// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify'; // Import Vuetify
import 'vuetify/styles'; // Global Vuetify styles

import { aliases, mdi } from 'vuetify/lib/iconsets/mdi';
import * as components from 'vuetify/components'; // Import all components
import * as directives from 'vuetify/directives'; // Import all directives

const vuetify = createVuetify({
  components, // Register all components globally
  directives, // Register all directives globally
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

const app = createApp(App);
app.use(vuetify);
app.mount('#app');
