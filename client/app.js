/**
* this is the app
* @file_overview this the starting point for the application.
* @author keith showalter {@link https://github.com/kshowalter}
* @version 0.1.0
*/
console.log('/\\');

import Chance from 'chance';
import $ from 'simpledom';
import f from 'functions';

var global = window || global;
global.logger = console.log;
global.f = f;

//import noise from '../lib/noisejs/perlin';
var noise = require('../lib/noisejs/perlin');
var hsltorgb = require('../lib/hsltorgb');

//////////////

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


noise.seed('idoria');
var chance = Chance('idoria');
//noise.seed(Math.random());
////////////////////

var standard_parallels = 37.5 * Math.PI / 180;
var get_lon_lat = function(lon,lat){
  // https://en.wikipedia.org/wiki/Hobo%E2%80%93Dyer_projection
  // Hobo–Dyer projection

  // https://en.wikipedia.org/wiki/Equirectangular_projection
  lon = lon / Math.cos(standard_parallels) + 0;
  lat = lat + standard_parallels;

  var central_meridian = 0;
  var standard_latitude = 0;

  return [lon,lat];
};



var to_cartesian = function(r,lon,lat){
  lon *= Math.PI/180;
  lat *= Math.PI/180;

  // https://stackoverflow.com/a/1185413
  //var x = r * Math.cos(lat) * Math.cos(lon);
  //var y = r * Math.cos(lat) * Math.sin(lon);
  //var z = r * Math.sin(lat);

  // http://astro.uchicago.edu/cosmus/tech/latlong.html
  var x = -r * Math.cos(lat) * Math.cos(lon);
  var y =  r * Math.sin(lat) ;
  var z =  r * Math.cos(lat) * Math.sin(lon);

  return [x,y,z];
};


//console.log(get_lon_lat(0,0));
//console.log(get_lon_lat(1,0));
//console.log(get_lon_lat(2,0));
//console.log(get_lon_lat(0,37.5));
//console.log(get_lon_lat(1,37.5));
//console.log(get_lon_lat(2,37.5));
//console.log(get_lon_lat(0,80));
//console.log(get_lon_lat(1,80));
//console.log(get_lon_lat(2,80));


function draw(id) {
  var canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  canvas.style.backgroundColor = "white";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var r,g,b,a;

    var width = 360*2;
    var height = 180*2;

    //var img_data_land = ctx.createImageData(width, height);
    var img_data_map = ctx.createImageData(width, height);
    var img_data_temperature = ctx.createImageData(width, height);
    var img_data_rain = ctx.createImageData(width, height);



    var continent_factor = 75;
    var continent_noise_factor = 25;
    var temperature_factor = 23;
    var rain_factor = 42;

    var sealevel = 0.6 *(2)-1;
    console.log('sealevel', sealevel);

    var biome_rgbs = {
      'water': [163, 204, 255],
      'temperate forest': [184, 215, 181],
      'tropical forest': [184, 255, 181],
      'plains': [228, 236, 206],
      'desert': [248, 243, 218],
      'tundra': [233, 231, 222],
      'polar': [250,252,253],
    };

    var measurments = global.measurments = [];


    var range = [0,0];

    for (var ix = 0; ix <= width; ix++) {
      var grid_line = [];
      for (var iy = 0; iy <= height; iy++) {

        var lon = ix * 360/width - 360/2;
        var lat = iy * 180/height - 180/2;
        measurments[lon] = measurments[lon] || [];
        measurments[lon][lat] = {};

        var coor = [lon,lat];
        var location = to_cartesian(100,coor[0],coor[1]);

        // All noise functions return values in the range of -1 to 1.
        var altitude = noise.simplex3( location[0]/continent_factor, location[1]/continent_factor, location[2]/continent_factor );
        var altitude_noise = noise.simplex3( location[0]/continent_noise_factor, location[1]/continent_noise_factor, location[2]/continent_noise_factor );
        var termperature_noise = noise.simplex3( location[0]/temperature_factor, location[1]/temperature_factor, location[2]/temperature_factor );
        var rain_noise = noise.simplex3( location[0]/rain_factor, location[1]/rain_factor, location[2]/rain_factor );

        altitude_noise *= 0.2;
        altitude += altitude_noise;
        measurments[lon][lat].altitude = altitude;

        // max avg temp = 30
        // min avg temp = -30
        var temperature = ( (90-Math.abs(lat))/90 * 60 - 30 ) + ( altitude * 5 ) + ( termperature_noise * 2 );
        measurments[lon][lat].temperature = temperature;
        if( temperature < range[0] ) range[0] = temperature;
        if( temperature > range[1] ) range[1] = temperature;

        // Mean annual rainfall (cm)
        // range 0-350+ cm
        var rainfall = 300 - ( Math.abs(altitude) * 250 ) + ( rain_noise * 50 );
        measurments[lon][lat].rainfall = rainfall;
        //if( rainfall < range[0] ) range[0] = rainfall;
        //if( rainfall > range[1] ) range[1] = rainfall;


        var biome_name;
        if( temperature > 10 ){
          if( rainfall < 40 ){
            biome_name = 'desert';
          } else if( rainfall < 75){
            biome_name = 'plains';
          } else if( rainfall < 200){
            biome_name = 'temperate forest';
          } else {
            biome_name = 'tropical forest';
          }
        } else {
          if( rainfall < 150 ){
            biome_name = 'tundra';
          } else {
            biome_name = 'polar';
          }
        }
        measurments[lon][lat].biome_name = biome_name;

        var biome_rgb;
        var land_sea_rgb;
        if(altitude < sealevel) {
          biome_rgb = biome_rgbs['water'];
          //land_sea_rgb = biome_rgbs['water'];
        } else {
          biome_rgb = biome_rgbs[biome_name];
          //land_sea_rgb = biome_rgbs['plains'];

        }

        var i = ( ix + iy*width ) * 4;
        a = 255;

        //r = land_sea_rgb[0];
        //g = land_sea_rgb[1];
        //b = land_sea_rgb[2];
        //img_data_land.data[i+0] = r;
        //img_data_land.data[i+1] = g;
        //img_data_land.data[i+2] = b;
        //img_data_land.data[i+3] = a;

        r = biome_rgb[0];
        g = biome_rgb[1];
        b = biome_rgb[2];
        img_data_map.data[i+0] = r;
        img_data_map.data[i+1] = g;
        img_data_map.data[i+2] = b;
        img_data_map.data[i+3] = a;
        //*/

        var h = (1-(temperature+40)/80) * 240/360;
        var temperature_rgb = hsltorgb(h,1,0.5);
        img_data_temperature.data[i+0] = temperature_rgb[0];
        img_data_temperature.data[i+1] = temperature_rgb[1];
        img_data_temperature.data[i+2] = temperature_rgb[2];
        img_data_temperature.data[i+3] = a;


        var h = rainfall/350 * 240/360;
        var rainfall_rgb = hsltorgb(h,1,0.5);
        img_data_rain.data[i+0] = rainfall_rgb[0];
        img_data_rain.data[i+1] = rainfall_rgb[1];
        img_data_rain.data[i+2] = rainfall_rgb[2];
        img_data_rain.data[i+3] = a;


      }
    }


    console.log(range);

    //var value_sum = values.reduce(function(acc, val) {
    //  return acc + val;
    //}, 0);
    var cx = 10;
    var cy = 10;
    //ctx.putImageData(img_data_land, cx, cy);
    //cy += 10 + height;
    ctx.putImageData(img_data_map, cx, cy);
    cy += 10 + height;
    ctx.putImageData(img_data_temperature, cx, cy);
    cy += 10 + height;
    ctx.putImageData(img_data_rain, cx, cy);



    cx = 10 + width + 30;
    cy = 10;
    ctx.strokeStyle = 'black';
    for( var biome_name in biome_rgbs){
      biome_rgb = biome_rgbs[biome_name];
      r = biome_rgb[0];
      g = biome_rgb[1];
      b = biome_rgb[2];
      ctx.fillStyle = 'rgb('+r+', '+g+', '+b+')';
      ctx.fillRect(cx, cy, 15, 15);
      ctx.strokeRect(cx, cy, 15, 15);
      ctx.fillStyle = 'black';
      ctx.fillText(biome_name, cx+20, cy+12);
      cy += 5 + 15;
    }

    var cx = 10;
    var cy = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, 1, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx+width, cy, 1, 0, 2*Math.PI);
    ctx.fill();
    cy += height;
    ctx.beginPath();
    ctx.arc(cx, cy, 1, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx+width, cy, 1, 0, 2*Math.PI);
    ctx.fill();

    var cx = 10;
    var cy = 10;
    ctx.beginPath();
    lon = 0;
    lat = 0;
    var lx = cx + (lon+360/2)*width/360; // x coordinate
    var ly = cy + (lat+180/2)*height/180; // y coordinate
    ctx.arc(lx, ly, 1, 0, 2*Math.PI);
    ctx.fill();

    var cx = 10;
    var cy = 10;
    var attemts = 0;
    var cities = global.cities = [];
    while( cities.length < 5 || attemts < 30 ){
      var city_name = chance.city();
      var lat = chance.integer({min: -90, max: 90});
      var lon = chance.integer({min: -180, max: 180});
      var measurment = measurments[lon][lat];
      if( measurment.altitude > sealevel && measurment.altitude < sealevel*1.42 ){
        var city = {
          name: city_name,
          lon: lon,
          lat: lat,
          color: chance.color({format: 'rgb'}),
          measurment: measurment
        };

        cities.push(city);

        ctx.fillStyle = city.color;
        ctx.beginPath();
        var lx = cx + (lon+360/2)*width/360; // x coordinate
        var ly = cy + (lat+180/2)*height/180; // y coordinate
        var radius = 5; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = 2 * Math.PI; // End point on circle
        ctx.arc(lx, ly, radius, startAngle, endAngle);
        ctx.fill();

      }
      attemts++;
    }

    cx = 10 + width + 150;
    cy = 10;
    ctx.strokeStyle = 'black';
    cities.forEach(function(city){
      //var city_rgb = city.color.slice(4,-1).split(',');
      //r = city_rgb[0];
      //g = city_rgb[1];
      //b = city_rgb[2];
      //ctx.fillStyle = 'rgb('+r+', '+g+', '+b+')';
      ctx.fillStyle = city.color;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(cx, cy+10, 5, 0, 2*Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy+10, 5, 0, 2*Math.PI);
      ctx.stroke();

      ctx.fillStyle = 'black';
      var text = city.name +'  ['+ city.lon +', '+ city.lat +']';
      ctx.fillText(text, cx+20, cy+12);

      cy += 5 + 15;
    });

    /*
    var image = new Image();
    image.onload = function(){
      ctx.drawImage(image, 750, 100, 200, 200);
    };
    image.src = "bird.jpg";
    */



    /*
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
    //*/


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
