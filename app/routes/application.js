import Ember from 'ember';
/**
 * This should be refactored into a separate controller,
 * but this was th only way I could get it working with the
 * nav-bar component.
 */
export default Ember.Route.extend({
    model: function(){
        return this.store.all('location');
    }
});