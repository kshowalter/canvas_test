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
global.start_time = new Date();
sessionStorage.load_times = sessionStorage.load_times || '';
global.to_inspect = {
  samples: 0,
  reused: 0,
  calculated: 0
};
global.measurments = {};

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
console.log('|>|_/\\|\\|ET ', planet);




settings.pixelation = 0.25;

var refine = function refine(){
  draw('canvas', planet, function(){


    //*
    if( settings.pixelation > 1 ){
      settings.pixelation = 1;
      requestAnimationFrame(refine);
    } else if( settings.pixelation < 1 ){
      settings.pixelation *= 2;
      if( settings.pixelation > 1 ){ settings.pixelation = 1; }
      setTimeout(function(){
        requestAnimationFrame(refine);
      }, 100);
    } else if( settings.pixelation === 1 ){
      console.log('FULL resolultion [XX]');
      global.end_time = new Date();
      global.load_time = ( global.end_time - global.start_time );
      sessionStorage.load_times += ','+ global.load_time;
      var load_times = sessionStorage.load_times.split(',');
      console.log(global.to_inspect);
      console.log(load_times);
      console.log('load improvment: ', load_times.slice(-2,-1)-load_times.slice(-1));
    } else {
      console.log('FORGOT SOMETHING');
    }
    //*/
  });



};


window.onload = function(){
  refine();
};
