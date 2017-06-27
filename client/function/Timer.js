var Timer = function(){
  var start = new Date();

  var timer = function(){
    var time = new Date();
    return time - start;
  };
  
  return timer;
};

module.exports = Timer;
