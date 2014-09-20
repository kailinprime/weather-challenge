import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return this.store.all('error');
    },
    setupController: function(controller, model) {
        var errorController = this.controllerFor('error');
        errorController.addError(model.message);
        this.transitionTo('index');
    }
});