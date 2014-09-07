import Ember from 'ember';

export default Ember.ArrayController.extend({
    hasLocations: function(){
        return this.get('locations').length > 0;
    }.property('locations'),
    locations: function(){
        return this.store.all('location');
    }.property('model')
});
