import settings from '../settings';

export default function(planet, x, y, pixelation, callback){
  var cx = x;
  var cy = y;
  var r,g,b,a;

  var map_width = settings.map.projection.width;
  var map_height = settings.map.projection.height;
  map_width *= pixelation;
  map_height *= pixelation;

  var img_data_map = new ImageData(map_width, map_height);

  for (var ix = 0; ix <= map_width; ix++) {
    for (var iy = 0; iy <= map_height; iy++) {

      var lon = ix * 360/map_width - 360/2;
      var lat = iy * 180/map_height - 180/2;
      lat *= -1;

      var coor = [lon,lat];

      var measurment = planet.sensor(coor);

      var biome_rgb;
      if( measurment.altitude < 0 ) {
        biome_rgb = settings.rgb.biome['water'];
      } else {
        biome_rgb = settings.rgb.biome[measurment.biome_name];
      }

      var i = ( ix + iy*map_width ) * 4;
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

  //ctx.putImageData(img_data_map, cx, cy);

  //return img_data_map;
  callback(img_data_map, x, y);
}
