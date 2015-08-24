import Reflux from 'reflux';

export var addRoute= Reflux.createAction('addRoute');

export var MapRouteStore = Reflux.createStore({
  init: function() {
    this.listenTo(addRoute, this.updateRoute);
  },

  updateRoute: function(route) {
    this.trigger(route);
  }
});
