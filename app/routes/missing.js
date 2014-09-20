import Ember from 'ember';

/**
 * Missing route, just redirect to the index
 */
export default Ember.Route.extend({
    renderTemplate: function(){
        var controller = this.get('controllers.index');
        this.render('index', {
            controller: controller
        });
    }
});