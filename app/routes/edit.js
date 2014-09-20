import Ember from 'ember';

/**
 * Edit an existing location has no hook in UI right now.
 * - need to hoolk this up and add a DELETE route as well. (Problem for a different day)
 */
export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model', model);
    },

    renderTemplate: function(){
        var controller = this.get('controllers.edit');
        var errors = controller.get('errors');
        this.render('edit', {
            controller: controller,
            errors: errors
        });
    }
});