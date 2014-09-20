import Ember from 'ember';

export default Ember.ArrayController.extend({
    locations: function(){
        return this.store.all('location');
    }.property()
});