import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return this.store.all('location');
    },
    actions: {
        clearErrors: function(){
            Ember.Logger.info('handle clearErrors from application route');
            this.get('controllers.error').clearErrors();
        }
    }
});