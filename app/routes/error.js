import Ember from 'ember';

/**
 * When a big bad boom happens, show it to the user and redirect to the index.
 * - The error handling story should encompass this, but does not currently
 * - Right now the error still shows up in the console.
 * - It would be nice to have marked it as processed, but I couldn't find a way to make that happen.
 */
export default Ember.Route.extend({
    model: function(){
        return this.store.all('error');
    },
    setupController: function(controller, model) {
        alert(model.message);
        this.transitionTo('index');
    }
});