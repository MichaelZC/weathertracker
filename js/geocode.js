"use strict";
require("es5-shim")
require("babel/register")
var Promise = require('es6-promise').Promise
var $ = require('jquery')

export var reverseGeo = (ll) => $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${ll.latitude},${ll.longitude}`).then(
        (data) => {
        	console.log(data.results)
        	return [data.results[0].address_components[3].short_name, data.results[0].address_components[4].short_name]
        })


export var geo = (q) => $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${q}`)
