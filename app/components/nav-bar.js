import Ember from 'ember';

export default Ember.Component.extend({
   hasLocations: function(){
       var locations = this.get('locations');
       var hasLocations = false;
       locations.forEach(function(loc){
           if(loc.get('name')){
               hasLocations = true;
           }
       })
       return hasLocations;
   }.property('locations.@each.name'),
   locations: null
});