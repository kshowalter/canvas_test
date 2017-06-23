var settings = {
  map_width: 360*2,
  map_height: 180*2,
  globe_map_size: 360,
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
  pixelation: 0.5
};

settings.globe_size = settings.globe_map_size * 0.9;

export default settings;
