import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['weather','error'],
    error: Ember.computed.alias('controllers.error'),
    addError: function(msg){
        this.get('error').addError(msg);
    },
    errorCount: function(){
        return this.get('errors').get('errorCount');
    }.property('controllers.error.errorCount'),
    isEdit: false,
    tempScales: [
        {label: 'Fahrenheit', value: 'F'},
        {label: 'Celsius', value: 'C'}
    ],
    forecastScopes: [
        {label: '5 day', value: 5},
        {label: '14 day', value: 14}
    ],
    location: null,
    saveAndTransition: function () {
        var me = this;
        var currentLocation = me.get('location');
        var errorCount = me.get('error').get('errorCount');
        Ember.Logger.info('errorCount',errorCount);
        if(errorCount === 0) {
            currentLocation.save()
                .then(function (loc) {
                    me.set('location', me.store.createRecord('location', {}));
                    me.transitionToRoute('show', loc);
                })
                .catch(function (err) {
                    me.addError(err.message);
                });
        }
    },
    actions: {
        commit: function () {
            var me = this;
            var currentLocation = me.get('location');
            var weatherService = this.get('controllers.weather');
            currentLocation.set('country',null);
            weatherService.locationVerification(currentLocation)
                .done(function () {
                    me.saveAndTransition();
                })
                .fail(function (err) {
                    me.addError('Close errors to try again');
                    me.addError(err.message);
                });
        }
    },
    init: function () {
        var location = this.store.createRecord('location', {});
        this.set('location', location);
        location.set('scope', location.get('scope'));
        location.set('scale', location.get('scale'));
    }
})
;
