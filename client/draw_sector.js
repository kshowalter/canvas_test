import settings from './settings';

var map_width = settings.map.projection.width;
var map_height = settings.map.projection.height;

function disableSmoothRendering(ctx) {
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  return ctx;
}


export default function(id, planet, callback){
  console.log('/Drawing at: ', settings.pixelation);

  var canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

        // Store the current transformation matrix
    ctx.save();

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    //ctx.restore();


    disableSmoothRendering(ctx);


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




  }

  console.log('\\ DRAW done');
  callback();
}
