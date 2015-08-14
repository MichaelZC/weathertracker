"use strict";
require("es5-shim")
require("babel/register")

var Promise = require('es6-promise').Promise
var $ = require('jquery')

import * as api from './forecast_api.js'
import * as draw from './draw.js'
import * as geo from './geocode.js'

var qs = (q) => document.querySelector(q)

var GPS = new Promise((res, rej) => {
    // if gps successful, resolve with coordinates
    // else reject with error
    navigator.geolocation.getCurrentPosition(
        (gpsData) => res({
            lat: gpsData.coords.latitude,
            lng: gpsData.coords.longitude
        }), (error) => rej(error.message)
    )
})
var weatherArr = []
var currentScreen = 0

GPS.then((ll) => {
    weatherArr.push(ll)
    newInstance(ll)
})

var newInstance = (ll) => api.pullForecast(ll).then((data) => {
    draw.drawScreen({
        ll: data,
        alerts: data.alerts,
        temp: Math.floor(data.currently.apparentTemperature),
        humidity: Math.floor(data.currently.humidity * 100),
        percip: data.currently.percipProbability ? (data.currently.percipProbability * 100) : 0,
        summary: data.currently.summary,
        visibility: data.currently.visibility,
        icon: data.currently.icon
    })
})

qs('form').addEventListener("submit", (e) => {
    e.preventDefault()
    geo.geo(qs('input').value).then((data) => {
        newInstance(data.results[0].geometry.location)
        weatherArr.push(data.results[0].geometry.location)
        currentScreen++
    })
})
qs('.left').addEventListener('click', () => {
    if (currentScreen > 0) {
        newInstance(weatherArr[currentScreen - 1])
        currentScreen--
    }
})

qs('.right').addEventListener('click', () => {
    if ((currentScreen+1) < weatherArr.length) {
        newInstance(weatherArr[currentScreen+1])
        currentScreen++
    }
})