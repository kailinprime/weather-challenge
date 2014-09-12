import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params){
        // the model for this route is a new empty Ember.Object
        return this.store.find('location',params.location_id);
    },

    renderTemplate: function(){
        var controller = this.get('controllers.locationEdit');
        this.render('location.edit', {
            controller: controller
        });
    }
});