import Vue from 'vue'
import util from './util'
let {getRelativeDate}= util

Vue.filter('relativedate', function (val) {
    return getRelativeDate(val)
})
Vue.filter('toFixed', function (val, num, only_decimals) {
    let i= parseInt(val), f= parseFloat(val)
    return (!only_decimals || (only_decimals && i<f))? f.toFixed(num) : val
})