import settings from './settings';

var width = settings.width;
var height = settings.height;

export default function(ctx, measurments, location){
  var img_data_temperature = ctx.createImageData(width, height);
  var img_data_rain = ctx.createImageData(width, height);

  for (var ix = 0; ix <= width; ix++) {
    var grid_line = [];
    for (var iy = 0; iy <= height; iy++) {

      var lon = ix * 360/width - 360/2;
      var lat = iy * 180/height - 180/2;

      measurments[lon] = measurments[lon] || [];

      var coor = [lon,lat];


      var measurment = coor_details(coor);
      measurments[lon][lat] = measurment;

      var biome_rgb;
      var land_sea_rgb;
      if( measurment.altitude < sealevel) {
        biome_rgb = settings.rgb.biome['water'];
        //land_sea_rgb = settings.rgb.biome['water'];
      } else {
        biome_rgb = settings.rgb.biome[measurment.biome_name];
        //land_sea_rgb = settings.rgb.biome['plains'];

      }

      var i = ( ix + iy*width ) * 4;
      a = 255;

      //r = land_sea_rgb[0];
      //g = land_sea_rgb[1];
      //b = land_sea_rgb[2];
      //img_data_land.data[i+0] = r;
      //img_data_land.data[i+1] = g;
      //img_data_land.data[i+2] = b;
      //img_data_land.data[i+3] = a;

      r = biome_rgb[0];
      g = biome_rgb[1];
      b = biome_rgb[2];
      img_data_map.data[i+0] = r;
      img_data_map.data[i+1] = g;
      img_data_map.data[i+2] = b;
      img_data_map.data[i+3] = a;
      //*/

      var h = (1-(measurment.temperature+40)/80) * 240/360;
      var temperature_rgb = hsltorgb(h,1,0.5);
      img_data_temperature.data[i+0] = temperature_rgb[0];
      img_data_temperature.data[i+1] = temperature_rgb[1];
      img_data_temperature.data[i+2] = temperature_rgb[2];
      img_data_temperature.data[i+3] = a;


      var h = measurment.rainfall/350 * 240/360;
      var rainfall_rgb = hsltorgb(h,1,0.5);
      img_data_rain.data[i+0] = rainfall_rgb[0];
      img_data_rain.data[i+1] = rainfall_rgb[1];
      img_data_rain.data[i+2] = rainfall_rgb[2];
      img_data_rain.data[i+3] = a;


    }
  }


  console.log(range);

  //var value_sum = values.reduce(function(acc, val) {
  //  return acc + val;
  //}, 0);
  var cx = 10;
  var cy = 10;
  //ctx.putImageData(img_data_land, cx, cy);
  //cy += 10 + height;
  ctx.putImageData(img_data_map, cx, cy);
  cy += 10 + height;
  ctx.putImageData(img_data_temperature, cx, cy);
  cy += 10 + height;
  ctx.putImageData(img_data_rain, cx, cy);

}
