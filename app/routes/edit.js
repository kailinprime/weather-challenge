import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        Ember.Logger.info('routes.edit:setupController',model);
        controller.set('model', model);
    },

    renderTemplate: function(){
        var controller = this.get('controllers.edit');
        this.render('edit', {
            controller: controller
        });
    }
});