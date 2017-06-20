import Chance from 'chance';
import settings from './settings';
import mk_sensor from './mk_sensor';
import f from 'functions';



export default function(planet_name){
  var planet = {};

  planet.radius = 6000; // average, km
  planet.radius_deviation = 10; // +/- km
  planet.sealevel = planet.radius + ( planet.radius_deviation*2 * 0.6 - planet.radius_deviation );

  var sensor = mk_sensor(planet);

  var chance = Chance(planet_name);

  planet.sensor = sensor;


  var continent_map = [];
  var water_count = 0;
  for (var lon = -179; lon <= 180; lon++) {
    var lon_water_level = 0;
    for (var lat = -30; lat <= 30; lat++) {
      var measurment = planet.sensor([lon,lat]);
      if( measurment.altitude < 0 ) {
        lon_water_level++;
      }
    }
    if( lon_water_level > 55 ){
      water_count++;
    } else {
      water_count = 0;
    }
    continent_map.push({
      lon,
      lon_water_level,
      water_count,
      center_lon: lon-water_count/2
    });
  }
  continent_map.sort(function(a,b){
    return b.water_count - a.water_count;
  });
  planet.longitude_sensor_correction_factor = continent_map[1].center_lon - 180;





  var potential_cities = [];
  f.range(50).forEach(function(){
    var city_name = chance.city();
    var lon = chance.integer({min: -180, max: 180});
    var lat = chance.integer({min: -90, max: 90});
    var measurment = sensor([lon,lat]);

    var potential_city_values = {};
    //if( measurment.altitude > 0 ) potential_city_values.not_floded = 100;
    var max_altitude = planet.radius + planet.radius_deviation - planet.sealevel;
    var max_depth = planet.sealevel - ( planet.radius - planet.radius_deviation ) ;
    if( measurment.altitude > 0 ){
      potential_city_values.altitude = Math.pow(max_altitude-measurment.altitude,3)/Math.pow(max_altitude,3) * 100;
    } else {
      var depth = planet.sealevel-measurment.altitude;
      potential_city_values.altitude = - Math.pow(depth,0.5)/Math.pow(max_depth,0.5)*100;
    }
    potential_city_values.temperature = 100 - Math.abs( measurment.temperature - 15 )*100/25;
    potential_city_values.temperature *= 3;
    potential_city_values.rainfall = 100 - Math.abs( measurment.rainfall - 250 )*100/200;

    var potential_city_value = Object.keys(potential_city_values).reduce(function(sum,name){
      return sum + potential_city_values[name];
    },0) / Object.keys(potential_city_values).length;

    var city = {
      name: city_name,
      lon: lon,
      lat: lat,
      color: chance.color({format: 'rgb'}),
      measurment: measurment,
      potential_city_value: potential_city_value,
      potential_city_values: potential_city_values
    };

    potential_cities.push(city);

  });

  potential_cities.sort(function(a,b){
    return b.potential_city_value - a.potential_city_value;
  });

  planet.cities = potential_cities.slice(0,10);


  return planet;
}
