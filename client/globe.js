import settings from './settings';
import projection_orthographic from './projection_orthographic';

export default function(ctx, planet, cx_cy, central_longitude){
  var r,g,b,a;

  var globe_size = settings.globe_size;
  globe_size *= settings.pixelation;

  var diam = planet.radius * 2;

  var img_data_map = ctx.createImageData(globe_size, globe_size);
  //var measurments = global.measurments = [];

  for (var ix = 0; ix <= globe_size; ix++) {
    for (var iy = 0; iy <= globe_size; iy++) {

      var x = ix * diam/globe_size * 1.1 - diam*1.1 /2;
      var y = iy * diam/globe_size * 1.1 - diam*1.1 /2;
      y *= -1;

      var coor = projection_orthographic(planet, x, y, central_longitude);

      if( !isNaN(coor[0]) && !isNaN(coor[1]) ){

        //planet.sensor(coor);
        var measurment = planet.sensor(coor);
        //measurments[lon][lat] = measurment;

        var biome_rgb;
        if( measurment.altitude < 0) {
          biome_rgb = settings.rgb.biome['water'];
        } else {
          biome_rgb = settings.rgb.biome[measurment.biome_name];
        }

        var i = ( ix + iy*globe_size ) * 4;
        a = 255;

        r = Math.floor( biome_rgb[0] * 0.85 );
        g = Math.floor( biome_rgb[1] * 0.85 );
        b = Math.floor( biome_rgb[2] * 0.85 );
        img_data_map.data[i+0] = r;
        img_data_map.data[i+1] = g;
        img_data_map.data[i+2] = b;
        img_data_map.data[i+3] = a;

      } else {
        biome_rgb = settings.rgb.biome['space'];

        var i = ( ix + iy*globe_size ) * 4;
        a = 255;

        r = biome_rgb[0];
        g = biome_rgb[1];
        b = biome_rgb[2];
        img_data_map.data[i+0] = r;
        img_data_map.data[i+1] = g;
        img_data_map.data[i+2] = b;
        img_data_map.data[i+3] = a;
      }

    }
  }

  ctx.putImageData(img_data_map, cx_cy[0], cx_cy[1]);


}
