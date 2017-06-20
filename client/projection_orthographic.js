//var standard_parallels = 37.5 * Math.PI / 180;

export default function(planet, mx, my, central_longitude){

  var x = mx;
  var y = my;

  var r = planet.radius;

  // https://en.wikipedia.org/wiki/Hobo%E2%80%93Dyer_projection
  // Hobo–Dyer projection

  // https://en.wikipedia.org/wiki/Equirectangular_projection
  //lon = lon / Math.cos(standard_parallels) + 0;
  //lat = lat + standard_parallels;

  central_longitude = central_longitude * Math.PI/180 || 0;
  var central_latitude = 0;

  var p = Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
  var c = Math.asin( p/r );


  var lat = Math.asin( Math.cos(c) * Math.sin(central_latitude) + y * Math.sin(c) * Math.cos(central_latitude) / p );
  var lon = central_longitude + Math.atan( x * Math.sin(c) / ( p * Math.cos(c) * Math.cos(central_latitude) - y * Math.sin(c) * Math.sin(central_latitude) ) );

  var cos_c = Math.sin(central_latitude) * Math.sin(lat) + Math.cos(central_latitude) * Math.cos(lat) * Math.cos( lon - central_longitude );

  lat = lat * 180/Math.PI;
  lon = lon * 180/Math.PI;

  return [lon,lat];
}
