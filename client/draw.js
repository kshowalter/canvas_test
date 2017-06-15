import Chance from 'chance';

var noise = require('../lib/noisejs/perlin');
var hsltorgb = require('../lib/hsltorgb');
import Coor_details from './Coor_details';
import projection_cyl from './projection_cyl';
import map from './map';
import map_thermal from './map_thermal';

import settings from './settings';

noise.seed('idoria');
var chance = Chance('idoria');
//noise.seed(Math.random());
////////////////////
var coor_details = Coor_details(noise);

var width = settings.width;
var height = settings.height;

export default function(id){

  var canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  canvas.style.backgroundColor = "white";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');


    //var value_sum = values.reduce(function(acc, val) {
    //  return acc + val;
    //}, 0);
    var cx = 10;
    var cy = 10;
    map(ctx, coor_details, [cx,cy])
    //ctx.putImageData(img_data_land, cx, cy);
    //cy += 10 + height;

    cy += 10 + height;
    //map_thermal(ctx, measurments, [cx,cy]);



    cx = 10 + width + 30;
    cy = 10;
    ctx.strokeStyle = 'black';
    for( var biome_name in settings.rgb.biome){
      var biome_rgb = settings.rgb.biome[biome_name];
      var r = biome_rgb[0];
      var g = biome_rgb[1];
      var b = biome_rgb[2];
      ctx.fillStyle = 'rgb('+r+', '+g+', '+b+')';
      ctx.fillRect(cx, cy, 15, 15);
      ctx.strokeRect(cx, cy, 15, 15);
      ctx.fillStyle = 'black';
      ctx.fillText(biome_name, cx+20, cy+12);
      cy += 5 + 15;
    }






    cx = 10;
    cy = 10;
    var attemts = 0;
    var cities = global.cities = [];
    while( cities.length < 5 || attemts < 30 ){
      var city_name = chance.city();
      var lat = chance.integer({min: -90, max: 90});
      var lon = chance.integer({min: -180, max: 180});
      var measurment = measurments[lon][lat];
      if( measurment.altitude > settings.sealevel && measurment.altitude < settings.sealevel*1.42 ){
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

  }

}
