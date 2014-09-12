import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        // the model for this route is a new empty Ember.Object
        return this.store.createRecord('location',{});
    },

    setupController: function(controller, model) {
        controller.set('model', model);
    },

    renderTemplate: function(){
        var controller = this.get('controllers.create');
        this.render('location.edit', {
            controller: controller
        });
    }
});