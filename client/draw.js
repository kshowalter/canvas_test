var hsltorgb = require('../lib/hsltorgb');
import projection_cyl from './projection_cyl';
import map from './map';
import map_pixel from './map_pixel';
import map_thermal from './map_thermal';
import globe from './globe';
import legend from './legend';

import settings from './settings';

var map_width = settings.map_width;
var map_height = settings.map_height;
var globe_size = settings.globe_size;

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

    ctx.clearRect(0, 0, canvas.map_width, canvas.map_height);
    //disableSmoothRendering(ctx);

    var cx = 10;
    var cy = 10;
    //map(ctx, coor_details, [cx,cy]);




    ctx.clearRect(cx, cy, map_width, map_height);
    map_pixel(ctx, planet, [cx,cy]);
    ctx.drawImage(canvas, cx, cy, map_width*settings.pixelation, map_height*settings.pixelation, cx, cy, map_width, map_height);

    cx = 10 + map_width + 30;
    cy = 10;


    legend(ctx, planet, [cx,cy]);

    cx = 10;
    cy = 10;
    planet.cities.forEach(function(city){
      ctx.fillStyle = city.color;
      ctx.beginPath();
      var lx = cx + (city.lon+360/2)*map_width/360; // x coordinate
      var ly = cy + (city.lat+180/2)*map_height/180; // y coordinate
      var radius = 5; // Arc radius
      var startAngle = 0; // Starting point on circle
      var endAngle = 2 * Math.PI; // End point on circle
      ctx.arc(lx, ly, radius, startAngle, endAngle);
      ctx.fill();
      ctx.fillStyle = 'black';
      var text = city.name;
      ctx.fillText(text, lx+7, ly+4);
    });


    //cy += 10 + map_height;
    //map_thermal(ctx, measurments, [cx,cy]);

    cy = 10 + map_height + 10;
    ctx.clearRect(cx, cy, globe_size, globe_size);
    globe(ctx, planet, [cx,cy], -1*360/3);
    ctx.drawImage(canvas, cx, cy, globe_size*settings.pixelation, globe_size*settings.pixelation, cx, cy, globe_size, globe_size);
    cx += globe_size;
    globe(ctx, planet, [cx,cy], 0);
    ctx.drawImage(canvas, cx, cy, globe_size*settings.pixelation, globe_size*settings.pixelation, cx, cy, globe_size, globe_size);
    cx += globe_size;
    globe(ctx, planet, [cx,cy], 1*360/3);
    ctx.drawImage(canvas, cx, cy, globe_size*settings.pixelation, globe_size*settings.pixelation, cx, cy, globe_size, globe_size);




  }

  console.log('\\ DRAW done');
  callback();
}
