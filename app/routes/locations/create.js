import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        // the model for this route is a new empty Ember.Object
        return Ember.Object.create({});
    },

    setupController: function(controller, model) {
        controller.set('model', model);
    },

    renderTemplate: function(){
        var controller = this.get('controllers.locationsCreate');
        this.render('locations.location.edit', {
            controller: controller
        });
    }
});