var Analysis = function(){
  var min;
  var max;
  var avg;
  var count = 0;
  var avg_dev;
  var outliers = 0;

  var analysis = function(value){
    if( value === undefined ){
      return {
        min: min,
        max: max,
        avg: avg,
        avg_dev: avg_dev,
        count: count,
        outliers: outliers,
        outliers_percent: outliers/count*100
      };
    } else {
      value = Number(value);
      count++;
      min = min || value;
      if( value < min ){ min = value; }
      max = max || value;
      if( value > max ){ max = value; }
      avg = avg || value;
      avg = ( avg*(count-1) + value )/count;
      var dev = Math.abs( value - avg );
      avg_dev = avg_dev || dev;
      avg_dev = ( avg_dev*(count-1) + dev )/count;
      if( dev > avg_dev*2 ) outliers++;
      return {
        min: min,
        max: max,
        avg: avg,
        avg_dev: avg_dev,
        count: count,
        outliers: outliers,
        outliers_percent: outliers/count*100
      };
    }
  };

  return analysis;
};

module.exports = Analysis;
