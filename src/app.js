import Vue from "vue";
import App from "./pages/App";
import axios from "axios";
import VueSplide from '@splidejs/vue-splide';
import {APIKEY} from "./credentials.config";

Vue.use(VueSplide);



Vue.prototype.$axios = axios.create({
    baseURL: "https://api.airtable.com/v0/",
    headers: {
        "Authorization": "Bearer " + APIKEY
    }
});

var vm = new Vue({
    el: "#quiz",
    render: h => h(App)
})

