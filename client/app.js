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
var Analysis = require('./function/Analysis');
var Timer = require('./function/Timer');

var global = window || global;

global.Analysis = Analysis;
global.Timer = Timer;

global.logger = console.log;
global.f = f;
global.settings = settings;
sessionStorage.load_times = sessionStorage.load_times || '';
global.to_inspect = {
  samples: 0,
  reused: 0,
  calculated: 0,
  calculated_anal: Analysis(),
  reused_anal: Analysis(),
  load_time: Timer()
};
global.measurments = {};


/*
var indexedDB = window.indexedDB;
// Open (or create) the database
var measurments = indexedDB.open('measurments', 1);

measurments.onupgradeneeded = function(e) {
  var db = e.target.result;

  e.target.transaction.onerror = tDB.onerror;

  // Delete the old datastore.
  if (db.objectStoreNames.contains('todo')) {
    db.deleteObjectStore('todo');
  }

  // Create a new datastore.
  var store = db.createObjectStore('todo', {
    keyPath: 'timestamp'
  });
};


// Handle successful datastore access.
request.onsuccess = function(e) {
  // Get a reference to the DB.
  datastore = e.target.result;

  // Execute the callback.
  callback();
};

// Handle errors when opening the datastore.
request.onerror = tDB.onerror;
*/





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
      final_analysis();
      //console.log(load_times);
    } else {
      console.log('FORGOT SOMETHING');
    }
    //*/
  });



};


var final_analysis = function(){
  global.to_inspect.calculated_anal = global.to_inspect.calculated_anal();
  global.to_inspect.reused_anal = global.to_inspect.reused_anal();
  global.to_inspect.load_time = global.to_inspect.load_time();

  sessionStorage.load_times += ','+ global.to_inspect.load_time;
  var load_times = sessionStorage.load_times.split(',');
  console.log('load improvment: ', load_times.slice(-2,-1)-load_times.slice(-1));
  console.log(global.to_inspect);
};

window.onload = function(){
  refine();
};
