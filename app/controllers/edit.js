import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['weather'],
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
    errorMessage: null,
    errorWatch: function(){
        var weatherError = this.get('controllers.weather.errorMessage');
        if(weatherError !== null){
            this.set('errorMessage',weatherError);
        }
    }.observes('controllers.weather.errorMessage'),
    addError: function(msg){
        this.set('errorMessage', msg);
    },
    clearError: function(){
        this.set('errorMessage', null);
    },
    saveAndTransition: function () {
        var me = this;
        var currentLocation = me.get('location');
        if(!me.get('errorMessage') && currentLocation.get('isValid')) {
            currentLocation.save()
                .then(function (loc) {
                    me.set('location', me.store.createRecord('location', {}));
                    me.clearError();
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
            me.clearError();

            var currentLocation = me.get('location');
            var weatherService = this.get('controllers.weather');
            currentLocation.set('country',null);
            weatherService.locationVerification(currentLocation)
                .done(function () {
                    me.saveAndTransition();
                })
                .fail(function (err) {
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
