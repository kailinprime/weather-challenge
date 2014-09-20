import Ember from 'ember';

/**
 * get all the locations to pass to the nav-bar
 */
export default Ember.ArrayController.extend({
    locations: function(){
        return this.store.all('location');
    }.property()
});