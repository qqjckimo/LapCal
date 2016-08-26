Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}
require(['./module_data_manager.jsx', '../lib/bootstrap/3.3.7/css/bootstrap.min.css',
    'bootstrap-material-design/dist/css/bootstrap-material-design.css',
    'bootstrap-material-design/dist/css/ripples.min.css']);	
