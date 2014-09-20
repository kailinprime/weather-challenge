import Ember from 'ember';

export default Ember.View.extend({
    actions: {
        clearErrors: function(){
            this.sendAction('clearErrors');
        }
    }
});