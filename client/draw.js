var hsltorgb = require('../lib/hsltorgb');
import projection_cyl from './projection_cyl';
import map from './map';
import map_pixel from './map_pixel';
import map_thermal from './map_thermal';
import globe from './globe';
import legend from './legend';

import settings from './settings';

var width = settings.width;
var height = settings.height;

function disableSmoothRendering(ctx) {
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  return ctx;
}


export default function(id, planet, callback){
  console.log('/Drawing at: ', settings.pixelation);

  var canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    disableSmoothRendering(ctx);

    var cx = 10;
    var cy = 10;
    //map(ctx, coor_details, [cx,cy]);




    map_pixel(ctx, planet, [cx,cy]);
    ctx.drawImage(canvas, cx, cy, width*settings.pixelation, height*settings.pixelation, cx, cy, width, height);

    //cy += 10 + height;
    //map_thermal(ctx, measurments, [cx,cy]);
    cy += 10 + height;
    globe(ctx, planet, [cx,cy]);
    ctx.drawImage(canvas, cx, cy, width*settings.pixelation, height*settings.pixelation, cx, cy, width, height);

    cx = 10 + width + 30;
    cy = 10;


    legend(ctx, planet, [cx,cy]);

    cx = 10;
    cy = 10;
    planet.cities.forEach(function(city){
      ctx.fillStyle = city.color;
      ctx.beginPath();
      var lx = cx + (city.lon+360/2)*width/360; // x coordinate
      var ly = cy + (city.lat+180/2)*height/180; // y coordinate
      var radius = 5; // Arc radius
      var startAngle = 0; // Starting point on circle
      var endAngle = 2 * Math.PI; // End point on circle
      ctx.arc(lx, ly, radius, startAngle, endAngle);
      ctx.fill();
    });



  }

  console.log('\\ DRAW done');
  callback();
}
