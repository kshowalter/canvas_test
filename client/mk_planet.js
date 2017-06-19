import Chance from 'chance';
import settings from './settings';
import mk_sensor from './mk_sensor';



export default function(planet_name){
  var planet = {};

  var chance = Chance(planet_name);
  var sensor = mk_sensor(planet_name);

  planet.sensor = sensor;

  var attemts = 0;
  var cities = planet.cities = [];
  while( cities.length < 9 || attemts < 100 ){
    var city_name = chance.city();
    var lat = chance.integer({min: -90, max: 90});
    var lon = chance.integer({min: -180, max: 180});
    var measurment = sensor([lon,lat]);
    if( measurment.altitude > settings.sealevel && measurment.altitude < settings.sealevel*1.42 ){
      var city = {
        name: city_name,
        lon: lon,
        lat: lat,
        color: chance.color({format: 'rgb'}),
        measurment: measurment
      };

      cities.push(city);

    }
    attemts++;
  }



  return planet;
}
