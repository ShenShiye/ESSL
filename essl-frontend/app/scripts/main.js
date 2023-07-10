import { createApp } from 'vue';
import App from '@/views/layouts/app';
import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'; // BalmJS Team Material Components
import { isIE, killIE } from './kill-ie';

if (isIE) {
  killIE();
}

const app = createApp(App);

app.use(BalmUI, {
  $theme: {
    // (Optional) New in 9.28.0, See ThemeColor type in APIs.

  }
}); // Mandatory

app.use(BalmUIPlus); // Optional

app.mount('#app');
