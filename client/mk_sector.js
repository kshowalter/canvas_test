import Chance from 'chance';
import settings from './settings';
import mk_sector_sensor from './mk_sector_sensor';



export default function(sector_id){
  console.log( 'TRAVELING TO: ', sector_id );
  var chance = Chance(sector_id);
  var sector = {};

  sector.id = sector_id;

  sector.desity = chance.normal({mean: 0.5, dev: 0.2});
  if( sector.density < 0.05 ){ sector.density = 0.05; }
  if( sector.density > 0.95 ){ sector.density = 0.95; }


  var sensor = mk_sector_sensor(sector);


  sector.sensor = sensor;



  return sector;
}
