import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Notify, Loading } from 'quasar'


// Icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Quasar CSS
import 'quasar/src/css/index.sass'

// Language
import es from 'quasar/lang/es.js'

const app = createApp(App)


app.use(Quasar, {
  plugins: { Notify, Loading }, 
  lang: es,
  iconSet: 'material-icons',
})

app.mount('#app')
