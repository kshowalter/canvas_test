/**
* this is the app
* @file_overview this the starting point for the application.
* @author keith showalter {@link https://github.com/kshowalter}
* @version 0.1.0
*/
console.log('/\\');

import $ from 'simpledom';
import f from 'functions';
import hash_router from 'hash_router';

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



var router = hash_router(function(selection){
  // selection = [ galaxy, section, system, planet, location(city, ...) ]
  console.log('ROUTING...');
  if(selection){
    global.to_inspect = {
      samples: 0,
      reused: 0,
      calculated: 0,
      calculated_anal: Analysis(),
      reused_anal: Analysis(),
      load_time: Timer()
    };
    settings.pixelation = 0.25;
    var planet_name = selection[3];
    console.log('DESTINTATION SELECTED: ', planet_name);
    var planet = mk_planet( selection[0] );
    console.log( planet_name, ' details: ', planet);
    //refine(planet);
  } else {
    // 27,200 light-years earth to center
    // milkyway 100-180 kly diameter
    // 2 kly thick
    var home = '0/0/Sol/Idoria';
    console.log('no planet selection, going home: ', home);
    router(home);
  }
});








// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var request = indexedDB.open('GalacticDatabase', 5);

// Create the schema
request.onupgradeneeded = function() {
  console.log('onupgradeneeded');
  var db = request.result;
  var object_store_name = 'measurments';

  // Delete the old datastore.
  if (db.objectStoreNames.contains(object_store_name)) {
    db.deleteObjectStore(object_store_name);
  }
  var store = db.createObjectStore(object_store_name, {keyPath: 'id'});
  var index = store.createIndex('location', ['planet','location.lat', 'location.lon']);
};

var store;
var index;

request.onsuccess = function() {
  console.log('onsuccess');
  // Start a new transaction
  var db = request.result;
  var tx = db.transaction('measurments', 'readwrite');
  store = tx.objectStore('measurments');
  var index = store.index('location');

  // Add some data
  var id = 42;
  store.put({id: id++, planet: 'planet9', location: {lat: 10, lon:20}, value: Math.random() });
  store.put({id: id++, planet: 'planet9', location: {lat: 11, lon:20}, value: Math.random() });

  // Query the data
  store.get(43).onsuccess = function(e) {
    console.log(e.target.result);
  };

  index.get(['planet9', 10, 20]).onsuccess = function(e) {
    console.log(e.target.result);
  };

  // Close the db when the transaction is done
  tx.oncomplete = function() {
    console.log('DB DONE');
    db.close();
  };
};

request.onerror = function(event){
  console.log('error', event);

};







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



var refine = function refine(planet){
  draw('canvas', planet, function(){
    //*
    if( settings.pixelation > 1 ){
      settings.pixelation = 1;
      requestAnimationFrame(function(){
        refine(planet);
      });
    } else if( settings.pixelation < 1 ){
      settings.pixelation *= 2;
      if( settings.pixelation > 1 ){ settings.pixelation = 1; }
      setTimeout(function(){
        requestAnimationFrame(function(){
          refine(planet);
        });
      }, 100);
    } else if( settings.pixelation === 1 ){
      console.log('FULL resolultion [XX]');
      final_analysis(global.to_inspect);
      //console.log(load_times);
    } else {
      console.log('FORGOT SOMETHING');
    }
    //*/
  });



};


var final_analysis = function(to_inspect){
  var calculated_anal = to_inspect.calculated_anal();
  var reused_anal = to_inspect.reused_anal();
  var load_time = to_inspect.load_time();

  sessionStorage.load_times += ','+ to_inspect.load_time;
  var load_times = sessionStorage.load_times.split(',');
  console.log('load improvment: ', load_times.slice(-2,-1)-load_times.slice(-1));
  console.log(to_inspect);
  console.log({
    calculated_anal,
    reused_anal,
    load_time,

  });
};

/*
window.onload = function(){
  //router('idoria/suobiso');
  router('Idoria/suobiso');

};
*/
