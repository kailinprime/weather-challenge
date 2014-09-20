import Ember from 'ember';

export default Ember.Component.extend({
    hasErrors: function () {
        var errors = this.get('errors');
        var hasErrors = false;
        errors.forEach(function (e) {
            if (e) {
                hasErrors = true;
            }
        });
        return hasErrors;
    }.property('errors.length'),
    errors: null,
    actions: {
        clearErrors: function(){
            Ember.Logger.info('try to clearErrors');
            return this.sendAction('clearErrors');
        }
    }
});