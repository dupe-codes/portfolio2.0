import Reflux from 'reflux';

export var Actions = Reflux.createActions([
  'dataLoaded'
]);

export var APIDataStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.dataLoaded, this.updateData);
  },

  updateData: function(data) {
    this.trigger(data);
  }
});
