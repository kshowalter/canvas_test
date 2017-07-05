import settings from '../settings';

export default function(ctx, planet, cx_cy){

  var map_width = settings.map.projection.width;
  var map_height = settings.map.projection.height;
  //map_width *= settings.pixelation;
  //map_height *= settings.pixelation;

  var cx = cx_cy[0];
  var cy = cx_cy[1];
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

  cx = cx_cy[0];
  cy = cx_cy[1];
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


}
