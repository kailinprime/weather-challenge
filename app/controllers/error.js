import Ember from 'ember';

export default Ember.ArrayController.extend({
    sortProperties: ['message'],
    sortAscending: true,
    addError: function(errorMessage){
        this.store.createRecord('error',{message: errorMessage});
    },
    clearErrors: function(){
        Ember.Logger.info('errors:clearErrors');
        this.store.all('error').then(function(records){
            Ember.Logger.info('errors:records', records);
            records.content.forEach(function(rec) {
                Ember.run.once(this, function() {
                    rec.destroyRecord();
                });
            }, this);
        });
    },
    errorCount: function(){
        return this.store.all('error').get('length');
    }.property('model')
});