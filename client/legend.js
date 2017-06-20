import settings from './settings';

export default function(ctx, planet, location){

  var cx = location[0];
  var cy = location[1];


  // biome legend
  ctx.strokeStyle = 'black';
  for( var biome_name in settings.rgb.biome){
    if( biome_name !== 'space'){
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
  }

  // city legend
  cx = location[0];
  cy = location[1];
  cx += 120;
  ctx.strokeStyle = 'black';
  planet.cities.forEach(function(city){
    ctx.fillStyle = city.color;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(cx, cy+10, 5, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy+10, 5, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'black';
    var text = city.name +'  ['+ city.lon +', '+ city.lat +'], '+ f.format_value(city.measurment.altitude) +'km';
    ctx.fillText(text, cx+10, cy+15);
    cy += 5 + 15;
  });


}
