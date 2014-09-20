import Ember from 'ember';

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