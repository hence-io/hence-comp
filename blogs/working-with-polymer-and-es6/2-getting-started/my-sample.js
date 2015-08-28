(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'; // Some browsers still require this

// Match this to your component tag name, which must contain a [prefix]-[name]
Object.defineProperty(exports, '__esModule', {
  value: true
});
var is = 'my-sample';

var config = {
  is: is // In ES6, setting a key equal to a matching name variable can be shorten
};

// Define the MySample component for Polymer, which will automatically register it on the DOM for us after.
var MySample = Polymer(config);

// Expose some helpful parts of the component should they be leveraged by other components.
exports.is = is;
exports.config = config;

// Expose our component so it can be used dynamically later.
exports['default'] = MySample;

},{}]},{},[1]);
