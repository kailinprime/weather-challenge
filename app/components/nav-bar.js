import Ember from 'ember';

export default Ember.Component.extend({
   hasLocations: function(){
       var locations = this.get('locations');
       return (locations && locations.get('length') > 0);
   }.property('locations.@each.name'),
   locations: null
});