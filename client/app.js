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
import mk_planet from './mk_planet';
import settings from './settings';

var global = window || global;
global.logger = console.log;
global.f = f;
global.settings = settings;

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
var canvas = document.getElementById('canvas');
canvas.style.backgroundColor = 'white';


var planet = mk_planet('idoria');
settings.pixelation = 0.1;

var refine = function refine(){
  draw('canvas', planet, function(){

    /*
    if( settings.pixelation > 1 ){
      settings.pixelation = 1;
      refine();
    }
    if( settings.pixelation < 1 ){
      settings.pixelation *= 2;
      if( settings.pixelation > 1 ){ settings.pixelation = 1; }
      setTimeout(function(){
        refine();
      }, 100);
    }
    if( settings.pixelation === 1 ){
      console.log('FULL resolultion [XX]');
    }
    */
  });



};


window.onload = function(){
  refine();
};
