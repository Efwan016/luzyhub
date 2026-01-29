import _ from 'lodash';
window._ = _;

import axios from 'axios';
window.axios = axios;

axios.defaults.withCredentials = true; // 🔥 INI KUNCI NYA
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
