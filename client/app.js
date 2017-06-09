/**
 * this is the app
 * @file_overview this the starting point for the application.
 * @author keith showalter {@link https://github.com/kshowalter}
 * @version 0.1.0
 */
console.log('/\\');


import f from 'functions';
var global = window || global;
global.logger = console.log;
global.f = f;

//////////////

var target_element = document.getElementById('content');
target_element.style.backgroundColor = "#EAEAEA";

import mk_init_state from './mk_init_state';
var init_state = mk_init_state();

init_state.ui.center.x = Number( sessionStorage.getItem('center_x') ) || init_state.ui.center.x;
init_state.ui.center.y = Number( sessionStorage.getItem('center_y') ) || init_state.ui.center.y;
init_state.ui.scale = Number( sessionStorage.getItem('scale') ) || init_state.ui.scale;
//init_state.ui.view_size = sessionStorage.getItem('view_size') || init_state.ui.view_size;

init_state.drawing = map_drawing(init_state);


var reducers = {
  // actions.init()
  init: function(state, action){
    console.log('-action:', action);
    state.ui.redraw = true;
    return state;
  },
  // actions.route(subject_id)
  route: function(state, action){
    console.log('-action:', action);
    var subject_id = action.arguments[0];
    console.log('subject_id', subject_id);
    //state.ui.selected_subject = subject_id;
    state.ui.redraw = true;
    return state;
  },
  zoom: function(state, action){
    var zoom_direction = action.arguments[0];
    var zoom_factor = zoom_direction ? 1.2 : 0.8;
    state.ui.scale *= zoom_factor;
    return state;
  },
  move_x: function(state, action){
    var move_amount = action.arguments[0];
    state.ui.center.x += move_amount * state.ui.scale;
    return state;
  },
  move_y: function(state, action){
    var move_amount = action.arguments[0];
    state.ui.center.y += move_amount * state.ui.scale;
    return state;
  },

};

import mkViewConfig from './view/mkViewConfig';
var mk_page_spec = function(state, actions){
  //console.log('^s: ', state);
  global.state = state; // devmode
  sessionStorage.setItem('center_x', state.ui.center.x);
  sessionStorage.setItem('center_y', state.ui.center.y);
  sessionStorage.setItem('scale', state.ui.scale);
  //sessionStorage.setItem('view_size_w', state.ui.view_size.w);
  //sessionStorage.setItem('view_size_h', state.ui.view_size.h);
  document.title = state.ui.title;

  //var page_spec = mkViewConfig(state, actions);
  return page_spec;
};

//////////////

import website from 'mkwebsite';
var actions = website(target_element, init_state, reducers, mk_page_spec);
global.actions = actions;
///////////////

import router from 'hash_router';
router(actions.route);

import controls from './lib/controls';
controls.init(actions);

actions.init();

window.onresize = function(){
  //console.log(window.inner_width);
};


console.log('\\/');
