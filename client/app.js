/**
* this is the app
* @file_overview this the starting point for the application.
* @author keith showalter {@link https://github.com/kshowalter}
* @version 0.1.0
*/
console.log('/\\');

import $  from 'simpledom';

import f from 'functions';
var global = window || global;
global.logger = console.log;
global.f = f;

//import noise from '../lib/noisejs/perlin';
var noise = require('../lib/noisejs/perlin');
console.log(noise);

//////////////

//var target_element = document.getElementById('content');
var target_element = $('#content');
console.log(target_element);

target_element.append($({
  tag: 'canvas',
  props: {
    id: 'canvas',
    width: 1000,
    height: 1000
  }
}));


noise.seed('idoria');
////////////////////


function draw(id) {
  var canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  canvas.style.backgroundColor = "white";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var r,g,b,a;

    var width = 600;
    var height = 300;
    var img_data = ctx.createImageData(width, height);

    var bin = [0,0,0];

    for (var y = 0; y < height; y++) {
      var grid_line = [];
      for (var x = 0; x < width; x++) {
        // All noise functions return values in the range of -1 to 1.
        var altitude = noise.simplex2(x/100, y/100);
        var randomness = noise.simplex2(x/20, y/20);
        randomness *= 10;

        //*
        var shallows = -0.2;
        var shore = 0;
        var inland = 0.4;

        if( altitude < shallows ){
          r = 0 +randomness;
          g = 0 +randomness;
          b = 255 +randomness;
        } else if(altitude < shore) {
          r = 75 +randomness;
          g = 75 +randomness;
          b = 255 +randomness;
        } else if(altitude < inland) {
          r = (altitude/inland)*200 +randomness;
          g = 200 +randomness;
          b = 0//25-(altitude/inland)*25 +randomness;
        } else {
          r = 225 +randomness;
          g = 225 +randomness;
          b = 50 - altitude*50 +randomness;
        }
        //*/
        //altitude = ( altitude + 1 )/2;
        //r = altitude*255//255 - altitude*255;
        //g = altitude*255//altitude*255;
        //b = altitude*255//255 - altitude*255

        a = 255

        var i = ( x + y*width ) * 4;
        img_data.data[i+0] = r;
        img_data.data[i+1] = g;
        img_data.data[i+2] = b;
        img_data.data[i+3] = a;
      }
    }

    //var value_sum = values.reduce(function(acc, val) {
    //  return acc + val;
    //}, 0);
    ctx.putImageData(img_data, 100, 100);



    /*
    var image = new Image();
    image.onload = function(){
      ctx.drawImage(image, 750, 100, 200, 200);
    };
    image.src = "bird.jpg";
    */




    var width = 400;
    var height = 400;
    var img_data = ctx.createImageData(width, height);

    var r = 0;
    var g = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        // All noise functions return values in the range of -1 to 1.
        var i = ( x + y*width ) * 4;

        img_data.data[i+0] = 256 * x/width;
        img_data.data[i+2] = 256 * y/height;
        //img_data.data[i+2] = 256 * ( x/width + y/height )/2;
        img_data.data[i+3] = 256;
      }
    }
    ctx.putImageData(img_data, 100, 500);
  }
}






window.onload = function(){
  draw('canvas');
};





/*

import mk_init_state from './mk_init_state';
var init_state = mk_init_state();

init_state.ui.center.x = Number( sessionStorage.getItem('center_x') ) || init_state.ui.center.x;
init_state.ui.center.y = Number( sessionStorage.getItem('center_y') ) || init_state.ui.center.y;
init_state.ui.scale = Number( sessionStorage.getItem('scale') ) || init_state.ui.scale;
//init_state.ui.view_size = sessionStorage.getItem('view_size') || init_state.ui.view_size;

init_state.drawing = map_drawing(init_state);


var reducers = {
// actions.init()
init: function(state, action){
console.log('-action:', action);
state.ui.redraw = true;
return state;
},
// actions.route(subject_id)
route: function(state, action){
console.log('-action:', action);
var subject_id = action.arguments[0];
console.log('subject_id', subject_id);
//state.ui.selected_subject = subject_id;
state.ui.redraw = true;
return state;
},
zoom: function(state, action){
var zoom_direction = action.arguments[0];
var zoom_factor = zoom_direction ? 1.2 : 0.8;
state.ui.scale *= zoom_factor;
return state;
},
move_x: function(state, action){
var move_amount = action.arguments[0];
state.ui.center.x += move_amount * state.ui.scale;
return state;
},
move_y: function(state, action){
var move_amount = action.arguments[0];
state.ui.center.y += move_amount * state.ui.scale;
return state;
},

};

import mkViewConfig from './view/mkViewConfig';
var mk_page_spec = function(state, actions){
//console.log('^s: ', state);
global.state = state; // devmode
sessionStorage.setItem('center_x', state.ui.center.x);
sessionStorage.setItem('center_y', state.ui.center.y);
sessionStorage.setItem('scale', state.ui.scale);
//sessionStorage.setItem('view_size_w', state.ui.view_size.w);
//sessionStorage.setItem('view_size_h', state.ui.view_size.h);
document.title = state.ui.title;

//var page_spec = mkViewConfig(state, actions);
return page_spec;
};

//////////////

import website from 'mkwebsite';
var actions = website(target_element, init_state, reducers, mk_page_spec);
global.actions = actions;
///////////////

import router from 'hash_router';
router(actions.route);

import controls from './lib/controls';
controls.init(actions);

actions.init();

window.onresize = function(){
//console.log(window.inner_width);
};


console.log('\\/');
*/
