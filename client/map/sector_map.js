import settings from '../settings';

export default function(sector, x, y, pixelation, callback){
  //var cx = x;
  //var cy = y;
  var r,g,b,a;

  var map_width = settings.map.sector;
  var map_height = settings.map.sector;
  map_width *= pixelation;
  map_height *= pixelation;

  var img_data_map = new ImageData(map_width, map_height);

  for (var ix = 0; ix <= map_width; ix++) {
    for (var iy = 0; iy <= map_height; iy++) {

      var px = ix * settings.size.sector/map_width;
      var py = iy * settings.size.sector/map_height;

      var coor = [px,py,settings.size.sector/2];

      //console.log(coor);
      var measurment = sector.sensor(coor);

      var i = ( ix + iy*map_width ) * 4;
      r = measurment.density * 255;
      g = measurment.density * 255;
      b = measurment.density * 255;
      a = 255;
      //console.log(r,g,b);
      img_data_map.data[i+0] = r;
      img_data_map.data[i+1] = g;
      img_data_map.data[i+2] = b;
      img_data_map.data[i+3] = a;
    }
  }

  callback(img_data_map, x, y);
}
