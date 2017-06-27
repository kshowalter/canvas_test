import globe from './globe';


import settings from '../settings';


export default function(planet, map_settings, callback){

  //var map_settings = JSON.parse(JSON.stringify(settings));
  //map_settings.ctx = ctx;

  map_settings.globe_map_size_adjusted = Math.ceil(map_settings.globe_map_size*map_settings.pixelation);

  var img_data_map = new ImageData( map_settings.globe_map_size_adjusted*3, map_settings.globe_map_size_adjusted*3 );
  img_data_map.data.forEach(function(x,i){
    if( (i+1)%4 === 0 ){
      img_data_map.data[i] = 255;
    }
  });


  map_settings.cx = 0;
  map_settings.cy = 0;

  //ctx.fillStyle = 'black';
  //ctx.fillRect(map_settings.cx, map_settings.cy, map_settings.globe_map_size*3, map_settings.globe_map_size*3);

  map_settings.cx += map_settings.globe_map_size_adjusted;
  map_settings.central_latitude = 90;
  map_settings.central_longitude = 0;
  img_data_map = globe(planet, map_settings, img_data_map);

  map_settings.cx -= map_settings.globe_map_size_adjusted;
  map_settings.cy += map_settings.globe_map_size_adjusted;
  map_settings.central_latitude = 0;
  map_settings.central_longitude = -1*360/3;
  img_data_map = globe(planet, map_settings, img_data_map);

  map_settings.cx += map_settings.globe_map_size_adjusted;
  //map_settings.cy += map_settings.globe_map_size_adjusted;
  map_settings.central_latitude = 0;
  map_settings.central_longitude = 0;
  img_data_map = globe(planet, map_settings, img_data_map);

  map_settings.cx += map_settings.globe_map_size_adjusted;
  //map_settings.cy += map_settings.globe_map_size_adjusted;
  map_settings.central_latitude = 0;
  map_settings.central_longitude = 1*360/3;
  img_data_map = globe(planet, map_settings, img_data_map);

  map_settings.cx -= map_settings.globe_map_size_adjusted;
  map_settings.cy += map_settings.globe_map_size_adjusted;
  map_settings.central_latitude = -90;
  map_settings.central_longitude = 0;
  img_data_map = globe(planet, map_settings, img_data_map);



  callback(img_data_map, map_settings);
}
