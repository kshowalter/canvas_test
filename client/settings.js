var settings = {
  map: {
    projection:{
      width: 360*2,
      height: 180*2
    },
    globe_size: 360,
    sector: 500,
  },
  size: {
    // selection = [ galaxy, sector, system, planet, location(city, ...) ]
    // 27,200 light-years earth to center
    // milkyway 100-180 kly diameter
    // 2 kly thick
    sector: 1000 // ly
  },
  rgb: {
    biome: {
      'space': [0, 0, 0],
      'water': [163, 204, 255],
      'temperate forest': [184, 215, 181],
      'tropical forest': [184, 255, 181],
      'plains': [228, 236, 206],
      'desert': [248, 243, 218],
      'tundra': [233, 231, 222],
      'polar': [250,252,253],
    }
  },
  pixelation: 0.25
};

settings.globe_size = settings.map.globe_size * 0.9;

export default settings;
