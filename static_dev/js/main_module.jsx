Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}
require(['./module_data_manager.jsx', './media_index.js']);	
