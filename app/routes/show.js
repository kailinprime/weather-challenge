import Ember from 'ember';

/**
 * Lookup a location by the id
 * - would be nice to change the lookup param to the name, but the name is potentially volatile so 'id' it is
 */
export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model', model);
        this.controllerFor('index').set('location', model);
    },
    renderTemplate: function() {
        var controller = this.get('controllers.index');
        this.render('index', {
            controller: controller
        });
    }
});