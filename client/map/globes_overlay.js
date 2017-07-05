import settings from '../settings';
import projection_orthographic from './projection_orthographic';

var map_width = settings.map.projection.width;
var map_height = settings.map.projection.height;
var globe_map_size = settings.map.globe_size;
var globe_size = settings.globe_size;

export default function(ctx, planet, cx, cy){
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
