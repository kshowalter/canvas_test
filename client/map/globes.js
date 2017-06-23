import globe from './globe';
import globes_overlay from './globes_overlay';

import settings from '../settings';

export default function(ctx, planet, x, y){
  var cx = x;
  var cy = y;

  var globe_map_size = settings.globe_map_size;
  var globe_map_size_adjusted = Math.ceil(globe_map_size*settings.pixelation);

  ctx.fillStyle = 'black';
  ctx.fillRect(cx, cy, globe_map_size*3, globe_map_size*3);

  cx += globe_map_size;
  globe(ctx, planet, cx, cy, 90, 0);
  ctx.drawImage(ctx.canvas, cx, cy, globe_map_size_adjusted, globe_map_size_adjusted, cx, cy, globe_map_size, globe_map_size);
  cx -= globe_map_size;
  cy += globe_map_size;
  globe(ctx, planet, cx, cy, 0, -1*360/3);
  ctx.drawImage(ctx.canvas, cx, cy, globe_map_size_adjusted, globe_map_size_adjusted, cx, cy, globe_map_size, globe_map_size);
  cx += globe_map_size;
  globe(ctx, planet, cx, cy, 0, 0);
  ctx.drawImage(ctx.canvas, cx, cy, globe_map_size_adjusted, globe_map_size_adjusted, cx, cy, globe_map_size, globe_map_size);
  cx += globe_map_size;
  globe(ctx, planet, cx, cy, 0, 1*360/3);
  ctx.drawImage(ctx.canvas, cx, cy, globe_map_size_adjusted, globe_map_size_adjusted, cx, cy, globe_map_size, globe_map_size);
  cx -= globe_map_size;
  cy += globe_map_size;
  globe(ctx, planet, cx, cy, -90, 0);
  ctx.drawImage(ctx.canvas, cx, cy, globe_map_size_adjusted, globe_map_size_adjusted, cx, cy, globe_map_size, globe_map_size);

  cx = x;
  cy = y;
  globes_overlay(ctx, planet, cx, cy);

  //*/
}
