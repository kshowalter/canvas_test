/**
* this is the app
* @file_overview this the starting point for the application.
* @author keith showalter {@link https://github.com/kshowalter}
* @version 0.1.0
*/
console.log('/\\');

import $ from 'simpledom';
import f from 'functions';

import draw from './draw';

var global = window || global;
global.logger = console.log;
global.f = f;

//var target_element = document.getElementById('content');
var target_element = $('#content');
console.log(target_element);

target_element.append($({
  tag: 'canvas',
  props: {
    id: 'canvas',
    width: 1500,
    height: 1500
  }
}));

window.onload = function(){
  draw('canvas');
};
