import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-icons'
import quasarLang from 'quasar/lang/es'
import App from './App.vue'
import './style.css'


// (opcional) íconos de Material Icons
import '@quasar/extras/material-icons/material-icons.css'


import 'quasar/src/css/index.sass'



const app = createApp(App)

app.use(Quasar, {
  plugins: { Notify },
  iconSet: quasarIconSet,
  lang: quasarLang
})


app.mount('#app')
