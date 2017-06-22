var hsltorgb = require('../lib/hsltorgb');
import projection_cyl from './map/projection_cyl';
import map from './map/map';
import map_pixel from './map/map_pixel';
import map_thermal from './map/map_thermal';
import globe from './map/globe';
import legend from './map/legend';

import settings from './settings';

var map_width = settings.map_width;
var map_height = settings.map_height;
var globe_map_size = settings.globe_map_size;

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

    cx = 10 + map_width + 40;
    cy = 10;


    legend(ctx, planet, [cx,cy]);

    cx = 10;
    cy = 10;
    planet.cities.forEach(function(city){
      ctx.fillStyle = city.color;
      ctx.beginPath();
      var lx = cx + (city.lon+360/2)*map_width/360; // x coordinate
      var ly = cy + (-city.lat+180/2)*map_height/180; // y coordinate
      var radius = 5; // Arc radius
      var startAngle = 0; // Starting point on circle
      var endAngle = 2 * Math.PI; // End point on circle
      ctx.arc(lx, ly, radius, startAngle, endAngle);
      ctx.fill();
      ctx.fillStyle = 'black';
      var text = city.name;
      ctx.fillText(text, lx+7, ly+4);
    });

    cx = 10;
    cy = 10;
    ctx.save();
    ctx.strokeStyle = 'rgba(200, 200, 255, 0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx+map_width/2, cy);
    ctx.lineTo(cx+map_width/2, cy+map_height);
    ctx.moveTo(cx, cy+map_height/2);
    ctx.lineTo(cx+map_width, cy+map_height/2);
    ctx.stroke();
    ctx.restore();

    //cy += 10 + map_height;
    //map_thermal(ctx, measurments, [cx,cy]);

    var globe_size = globe_map_size * 0.9;

    cy = 10 + map_height + 10 + 50;
    ctx.fillStyle = 'black';
    ctx.fillRect(cx, cy, globe_map_size*3, globe_map_size*3);

    cx += globe_map_size;
    globe(ctx, planet, [cx,cy], 90, 0);
    ctx.drawImage(canvas, cx, cy, globe_map_size*settings.pixelation, globe_map_size*settings.pixelation, cx, cy, globe_map_size, globe_map_size);
    cx -= globe_map_size;
    cy += globe_map_size;
    globe(ctx, planet, [cx,cy], 0, -1*360/3);
    ctx.drawImage(canvas, cx, cy, globe_map_size*settings.pixelation, globe_map_size*settings.pixelation, cx, cy, globe_map_size, globe_map_size);
    cx += globe_map_size;
    globe(ctx, planet, [cx,cy], 0, 0);
    ctx.drawImage(canvas, cx, cy, globe_map_size*settings.pixelation, globe_map_size*settings.pixelation, cx, cy, globe_map_size, globe_map_size);
    cx += globe_map_size;
    globe(ctx, planet, [cx,cy], 0, 1*360/3);
    ctx.drawImage(canvas, cx, cy, globe_map_size*settings.pixelation, globe_map_size*settings.pixelation, cx, cy, globe_map_size, globe_map_size);
    cx -= globe_map_size;
    cy += globe_map_size;
    globe(ctx, planet, [cx,cy], -90, 0);
    ctx.drawImage(canvas, cx, cy, globe_map_size*settings.pixelation, globe_map_size*settings.pixelation, cx, cy, globe_map_size, globe_map_size);

    cx = 10;
    cy = 10 + map_height + 10 + 50;
    cx += globe_map_size*1.5;
    cy += globe_map_size*1.5;

    var globe_gap = globe_map_size - globe_size ;

    var line_dash = [5,5];

    // 30,60,90 triangle for 120 longitude
    var dy = (globe_size/2)/2;
    var dx = dy * Math.sqrt(3);

    ctx.strokeStyle = 'rgba(128, 128, 128, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy-globe_map_size*1);
    ctx.lineTo(cx, cy+globe_map_size*1);
    ctx.moveTo(cx-globe_map_size*1-globe_size/2, cy);
    ctx.lineTo(cx+globe_map_size*1+globe_size/2, cy);
    ctx.moveTo(cx-globe_map_size*1.0, cy-globe_size/2);
    ctx.lineTo(cx-globe_map_size*1.0, cy+globe_size/2);
    ctx.moveTo(cx+globe_map_size*1.0, cy-globe_size/2);
    ctx.lineTo(cx+globe_map_size*1.0, cy+globe_size/2);
    // plolar view +/- 120 deg
    ctx.moveTo(cx,    cy-globe_map_size*1.0);
    ctx.lineTo(cx+dx, cy-globe_map_size*1.0-dy);
    ctx.moveTo(cx,    cy-globe_map_size*1.0);
    ctx.lineTo(cx-dx, cy-globe_map_size*1.0-dy);
    ctx.moveTo(cx,    cy+globe_map_size*1.0);
    ctx.lineTo(cx+dx, cy+globe_map_size*1.0+dy);
    ctx.moveTo(cx,    cy+globe_map_size*1.0);
    ctx.lineTo(cx-dx, cy+globe_map_size*1.0+dy);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(128, 128, 128, 1)';
    // 120 deg connectors
    ctx.beginPath();
    ctx.moveTo(cx+dx, cy-globe_map_size*1.0-dy);
    ctx.quadraticCurveTo(cx+globe_map_size*1.0, cy-globe_map_size*1.5, cx+globe_map_size*1.0, cy-globe_size/2);
    ctx.moveTo(cx-dx, cy-globe_map_size*1.0-dy);
    ctx.quadraticCurveTo(cx-globe_map_size*1.0, cy-globe_map_size*1.5, cx-globe_map_size*1.0, cy-globe_size/2);
    ctx.moveTo(cx+dx, cy+globe_map_size*1.0+dy);
    ctx.quadraticCurveTo(cx+globe_map_size*1.0, cy+globe_map_size*1.5, cx+globe_map_size*1.0, cy+globe_size/2);
    ctx.moveTo(cx-dx, cy+globe_map_size*1.0+dy);
    ctx.quadraticCurveTo(cx-globe_map_size*1.0, cy+globe_map_size*1.5, cx-globe_map_size*1.0, cy+globe_size/2);
    ctx.setLineDash(line_dash);
    // inter globe connectors
    ctx.moveTo(cx, cy-globe_size/2);
    ctx.lineTo(cx, cy-globe_size/2-globe_gap);
    ctx.moveTo(cx, cy+globe_size/2);
    ctx.lineTo(cx, cy+globe_size/2+globe_gap);
    ctx.moveTo(cx+globe_size/2, cy);
    ctx.lineTo(cx+globe_size/2+globe_gap, cy);
    ctx.moveTo(cx-globe_size/2, cy);
    ctx.lineTo(cx-globe_size/2-globe_gap, cy);
    // done
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';

    var text = '+120 Lon';
    ctx.save();
    ctx.translate( cx+globe_map_size*1.0-15, cy-globe_size/2-40 );
    ctx.rotate((Math.PI / 180) * 90); // rotate
    ctx.fillText(text,0,0);
    ctx.restore();
    ctx.save();
    ctx.translate( cx+globe_map_size*1.0-15, cy+globe_size/2+40 );
    ctx.rotate((Math.PI / 180) * 90); // rotate
    ctx.fillText(text,0,0);
    ctx.restore();

    text = '-120 Lon';
    ctx.save();
    ctx.translate( cx-globe_map_size*1.0+15, cy+globe_size/2+40 );
    ctx.rotate((Math.PI / 180) * 90); // rotate
    ctx.fillText(text,0,0);
    ctx.restore();
    ctx.save();
    ctx.translate( cx-globe_map_size*1.0+15, cy-globe_size/2-40 );
    ctx.rotate((Math.PI / 180) * 90); // rotate
    ctx.fillText(text,0,0);
    ctx.restore();

    ctx.restore();

  }

  console.log('\\ DRAW done');
  callback();
}
