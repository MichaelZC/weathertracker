"use strict";
require("es5-shim")
require("babel/register")
var Promise = require('es6-promise').Promise
var $ = require('jquery')

var iconCollection = {
    'clear-day': 'sun105',
    'clear-night': 'moon11',
    'rain': 'raindrops2',
    'snow': 'snowflake144',
    'sleet': 'cloud1',
    'wind': 'river3',
    'fog': 'foggy4',
    'cloudy': 'cloud32',
    'partly-cloudy-day': 'cloud339',
    'partly-cloudy-night': 'moon178'
}

import * as geo from './geocode.js'

var qs = (q) => document.querySelector(q)


export var drawScreen = function (weatherObj) {

    geo.reverseGeo(weatherObj.ll).then((data) => {
        var loc = data.join(', ')
        qs('.location').innerHTML = loc
    });
    if (!!weatherObj.alerts) {
        qs('.alerts').innerHTML =
        `<p><span>${weatherObj.alerts.title}</span>
        ${weatherObj.alerts.description}</p>`;
        qs('.alerts').opacity = 0.99;
    }
    qs('.sum').style['background-image'] = `url(./images/${iconCollection[weatherObj.icon]}.svg)`
    qs('.temp').innerHTML = `${weatherObj.temp}°F`
    qs('.summary').innerHTML = `${weatherObj.summary}`
    qs('.stats').innerHTML = `<ul>
    <li>Humidity: ${weatherObj.humidity}%</li>
    <li>Chance of Percipitation: ${weatherObj.percip}%</li>
    <li>Visibility: ${weatherObj.visibility} Kilometers</li></ul>`
}
