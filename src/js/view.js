import $ from "jquery";
import _ from 'lodash';
import NProgress from 'nprogress'
import Vue from 'vue'

import { Event } from "../js/event.js"
import { Ui } from '../js/ui.js';

import App from '../App.vue'

var inited;

var initMapInteract = function () {};

var init = function (type, id) {
    NProgress.start();
    clear();
    NProgress.set(0.3);
    initControl();
    NProgress.set(0.6);
    render(type, id);
    NProgress.done();
};
var clear = function () {
    //clear main
    //$('#main').find("img").attr('src', ''); //stop image loading when doPage
    //$('#main').empty();
};
var initControl = function () {
    if (inited) { return; }

    document.getElementsByTagName('body')[0].setAttribute('lang', Ui.getLang());

    new Vue({
        el: '#app',
        //template: '<App/>',
        render: function (h) {
            return h('App')
        },
        components: { App }
    });

    inited = true;
};
var render = function (type, id) {
    Event.$emit('render', type, id);
};

export { init };
export default { init };