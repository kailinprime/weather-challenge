import Ember from 'ember';

export default
Ember.ObjectController.extend({
    needs: ['weather'],
    errors: [],
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
        currentLocation.save()
            .then(function (newLocation) {
                Ember.Logger.info('edit.saveAndTransition', newLocation.get('id'));
                me.set('location',me.store.createRecord('location'));
                me.transitionToRoute('show', newLocation.get('id'));
            });
    },
    actions: {
        commit: function () {
            var me = this;
            var errors = [];
            var currentLocation = me.get('location');

            var weatherService = this.get('controllers.weather');

            weatherService.locationVerification(currentLocation)
                .done(function () {
                    var error = weatherService.get('error');
                    if (error) {
                        errors.push(error);
                        me.set('location', currentLocation);
                        me.set('errors', errors);
                    } else {
                        var oldLocations = me.store.find('location', { name: currentLocation.get('name') });
                        if (oldLocations.length > 0) {
                            var oldLocation = oldLocations[0];

                            currentLocation.deleteRecord()
                                .then(function () {
                                    me.set('location', currentLocation);
                                    me.set('errors', errors);
                                    me.saveAndTransition();
                                })
                                .catch(function () {
                                    errors.push('Failed to delete record');
                                    me.set('location', currentLocation);
                                    me.set('errors', errors);
                                });
                        } else {
                            me.saveAndTransition();
                        }
                    }
                })
                .fail(function (location) {
                    me.set('errors', errors);
                    me.set('location', location);
                });
        }
    },
    init: function () {
        var location = this.store.createRecord('location', {});
        Ember.Logger.info('edit.init', location.get('id'));
        this.set('location',location);
        location.set('scope', location.get('scope'));
        location.set('scale', location.get('scale'));
    }
})
;
