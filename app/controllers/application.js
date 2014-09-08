import Ember from 'ember';

export default Ember.ArrayController.extend({
    hasLocations: function(){
        var x = this.get('locations').get('length') > 0;
        Ember.Logger.info(x);
        return x;
    }.property('locations.[]'),
    locations: function(){
        return this.store.find('location');
    }.property('model')
});
