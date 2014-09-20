import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model', model);
    },

    renderTemplate: function(){
        var controller = this.get('controllers.create');
        this.render('edit', {
            controller: controller
        });
    }
});