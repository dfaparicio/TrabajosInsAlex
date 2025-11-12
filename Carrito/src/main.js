import { createApp } from 'vue'
import { Quasar } from 'quasar'
import './style.css'
import App from './App.vue'


// (opcional) íconos de Material Icons
import '@quasar/extras/material-icons/material-icons.css'


import 'quasar/src/css/index.sass'



const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')
