var continent_factor = 75;
var continent_noise_factor = 25;
var temperature_factor = 23;
var rain_factor = 42;

var to_cartesian = function(r,lon,lat){
  lon *= Math.PI/180;
  lat *= Math.PI/180;

  // https://stackoverflow.com/a/1185413
  //var x = r * Math.cos(lat) * Math.cos(lon);
  //var y = r * Math.cos(lat) * Math.sin(lon);
  //var z = r * Math.sin(lat);

  // http://astro.uchicago.edu/cosmus/tech/latlong.html
  var x = -r * Math.cos(lat) * Math.cos(lon);
  var y =  r * Math.sin(lat) ;
  var z =  r * Math.cos(lat) * Math.sin(lon);

  return [x,y,z];
};


export default function(noise){

  var coor_details = function(coor){
    var measurment = {
      coor: coor
    };
    var lon = coor[0];
    var lat = coor[1];

    var location = measurment.location = to_cartesian(100,coor[0],coor[1]);

    // All noise functions return values in the range of -1 to 1.
    var altitude = noise.simplex3( location[0]/continent_factor, location[1]/continent_factor, location[2]/continent_factor );
    var altitude_noise = noise.simplex3( location[0]/continent_noise_factor, location[1]/continent_noise_factor, location[2]/continent_noise_factor );
    var termperature_noise = noise.simplex3( location[0]/temperature_factor, location[1]/temperature_factor, location[2]/temperature_factor );
    var rain_noise = noise.simplex3( location[0]/rain_factor, location[1]/rain_factor, location[2]/rain_factor );

    altitude_noise *= 0.2;
    altitude += altitude_noise;
    measurment.altitude = altitude;

    // max avg temp = 30
    // min avg temp = -30
    var temperature = ( (90-Math.abs(lat))/90 * 60 - 30 ) + ( altitude * 5 ) + ( termperature_noise * 2 );
    measurment.temperature = temperature;

    // Mean annual rainfall (cm)
    // range 0-350+ cm
    var rainfall = 300 - ( Math.abs(altitude) * 250 ) + ( rain_noise * 50 );
    measurment.rainfall = rainfall;

    var biome_name;
    if( temperature > 5 ){
      if( rainfall < 40 ){
        biome_name = 'desert';
      } else if( rainfall < 75){
        biome_name = 'plains';
      } else if( rainfall < 200){
        biome_name = 'temperate forest';
      } else {
        biome_name = 'tropical forest';
      }
    } else {
      if( rainfall < 150 ){
        biome_name = 'tundra';
      } else {
        biome_name = 'polar';
      }
    }
    measurment.biome_name = biome_name;

    return measurment;
  };


  return coor_details;
}
