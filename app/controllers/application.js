import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs:['error'],
    locations: function(){
        return this.store.all('location');
    }.property(),
    errors: function(){
        var errors = this.store.all('error');
        Ember.Logger.info('app:errors', errors);
        return errors;
    }.property(),
    actions: {
        clearErrors: function(){
            Ember.Logger.info('handle clearErrors from app con');
            this.get('controllers.error').clearErrors();
        }
    }
});