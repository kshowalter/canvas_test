import settings from './settings';
import sector_map from './map/sector_map';

var map_width = settings.map.sector;
var map_height = settings.map.sector;

function disableSmoothRendering(ctx) {
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  return ctx;
}


export default function(id, sector, callback){
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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    //ctx.restore();


    disableSmoothRendering(ctx);

    var cx = 10;
    var cy = 10;
    sector_map(sector, cx, cy, settings.pixelation, function(img_data_map, cx, cy){
      ctx.putImageData(img_data_map, cx, cy);
      ctx.drawImage(canvas, cx, cy, map_width*settings.pixelation, map_height*settings.pixelation, cx, cy, map_width, map_height);
      //map_pixel_overlay(ctx, planet, [cx,cy]);
    });




  }

  console.log('\\ DRAW done');
  callback();
}
