import settings from './settings';



export default function(ctx, planet, cx_cy){
  var r,g,b,a;

  var width = settings.width;
  var height = settings.height;
  width *= settings.pixelation;
  height *= settings.pixelation;

  var img_data_map = ctx.createImageData(width, height);
  var measurments = global.measurments = [];

  console.log(width, height);

  for (var ix = 0; ix <= width; ix++) {
    for (var iy = 0; iy <= height; iy++) {

      var lon = ix * 360/width - 360/2;
      var lat = iy * 180/height - 180/2;

      measurments[lon] = measurments[lon] || [];

      var coor = [lon,lat];

      var measurment = planet.sensor(coor);
      measurments[lon][lat] = measurment;

      var biome_rgb;
      if( measurment.altitude < settings.sealevel) {
        biome_rgb = settings.rgb.biome['water'];
      } else {
        biome_rgb = settings.rgb.biome[measurment.biome_name];
      }

      var i = ( ix + iy*width ) * 4;
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

  ctx.putImageData(img_data_map, cx_cy[0], cx_cy[1]);


}
