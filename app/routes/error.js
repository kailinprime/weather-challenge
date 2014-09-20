import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return this.store.all('error');
    },
    setupController: function(controller, model) {
        alert(model.message);
        this.transitionTo('index');
    }
});