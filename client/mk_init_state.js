export default function() {
  var initState = {
    db: [],
    drawing: {},
    svg: '',
    seed: 'pholow',
    ui: {
      title: 'procedural map test',
      redraw: true,
      scale: 1,
      center: {
        x: 100,
        y: 100,
      },
      view_size: {
        w: 1200,
        h: 950
      }
    }
  };


  return initState;
}
