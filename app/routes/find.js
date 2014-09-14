import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params){
        if(typeof params.location_id !== 'undefined'){
            return this.store.find('location',params.location_id);
        }else{
            return null;
        }
    },
    renderTemplate: function() {
        this.render('index');
    }
});