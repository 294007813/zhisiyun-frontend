import Vue from 'vue'
import util from './util'
let {getRelativeDate}= util

Vue.filter('relativedate', function (val) {
    return getRelativeDate(val)
})