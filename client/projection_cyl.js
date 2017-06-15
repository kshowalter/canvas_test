var standard_parallels = 37.5 * Math.PI / 180;

export default function(lon,lat){
  // https://en.wikipedia.org/wiki/Hobo%E2%80%93Dyer_projection
  // Hobo–Dyer projection

  // https://en.wikipedia.org/wiki/Equirectangular_projection
  lon = lon / Math.cos(standard_parallels) + 0;
  lat = lat + standard_parallels;

  var central_meridian = 0;
  var standard_latitude = 0;

  return [lon,lat];
}
