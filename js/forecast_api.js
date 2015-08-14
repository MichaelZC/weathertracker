require("es5-shim")
require("babel/register")

var Promise = require('es6-promise').Promise
var $ = require('jquery')

var weatherKey = 'cdf5ff13300db1eeb4253a0257b7f495'
export var pullForecast = (ll) =>
    $.getJSON(`https://api.forecast.io/forecast/${weatherKey}/${ll.lat},${ll.lng}?callback=?`)
