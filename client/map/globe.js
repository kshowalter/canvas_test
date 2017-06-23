import settings from '../settings';
import projection_orthographic from './projection_orthographic';

export default function(ctx, planet, x, y, central_latitude, central_longitude){
  var cx = x;
  var cy = y;
  var r,g,b,a;

  var globe_map_size = settings.globe_map_size;
  var globe_map_size_adjusted = Math.ceil(globe_map_size*settings.pixelation);

  var diam = planet.radius * 2;

  var img_data_map = ctx.createImageData(globe_map_size_adjusted, globe_map_size_adjusted);
  //var measurments = global.measurments = [];
  a = 255;

  for (var ix = 0; ix <= globe_map_size_adjusted; ix++) {
    for (var iy = 0; iy <= globe_map_size_adjusted; iy++) {

      var mx = ix * diam/globe_map_size_adjusted /0.9 - diam/0.9 /2;
      var my = iy * diam/globe_map_size_adjusted /0.9 - diam/0.9 /2;
      my *= -1;

      var coor = projection_orthographic(planet, mx, my, central_latitude, central_longitude);

      if( !isNaN(coor[0]) && !isNaN(coor[1]) ){
        //planet.sensor(coor);
        var measurment = planet.sensor(coor);
        //measurments[lon][lat] = measurment;
        var biome_rgb;
        if( measurment.altitude < 0) {
          //biome_rgb = settings.rgb.biome['water'];
          r = 0;
          g = 100 - (-measurment.altitude / planet.max_depth) * 50;
          b = 255 - (-measurment.altitude / planet.max_depth) * 128;
        } else {
          biome_rgb = settings.rgb.biome[measurment.biome_name];
          r = Math.floor( biome_rgb[0] * 0.85 );
          g = Math.floor( biome_rgb[1] * 0.85 );
          b = Math.floor( biome_rgb[2] * 0.85 );
        }
      } else {
        biome_rgb = settings.rgb.biome['space'];
        r = biome_rgb[0];
        g = biome_rgb[1];
        b = biome_rgb[2];
      }

      var i = ( ix + iy*globe_map_size_adjusted ) * 4;
      img_data_map.data[i+0] = r;
      img_data_map.data[i+1] = g;
      img_data_map.data[i+2] = b;
      img_data_map.data[i+3] = a;

    }
  }

  ctx.putImageData(img_data_map, x, y);


}
