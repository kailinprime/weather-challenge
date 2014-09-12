import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params){
        Ember.Logger.info('location id = ', params);
        if(typeof params.location_id !== 'undefined'){
            Ember.Logger.info('Existing location');
            return this.store.find('location',params.location_id);
        }else{
            Ember.Logger.info('Empty location');
            return null;
        }
    },
    renderTemplate: function() {
        this.render('index');
    }
});