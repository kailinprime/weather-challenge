import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['weather'],
    location: null,
    init: function() {
        var me = this;
        var location = me.get('location');
        if(!location){
            location = me.store.createRecord('location');
        }
        var weatherController = me.get('controllers.weather');
        location = weatherController.browserLocation(location);
        me.set('location', location);
    }
});