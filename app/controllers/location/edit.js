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
                me.set('location',me.store.createRecord('location'));
                me.transitionToRoute('location.index', newLocation);
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

                            Ember.Logger.info('replacing old record');

                            oldLocation.set('scope', currentLocation.get('scope'));
                            oldLocation.set('scale', currentLocation.get('scale'));
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
                            Ember.Logger.info('saving new record');
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
//        var loc = this.get('location');
//        if (loc === null) {
//            this.set('location', this.store.createRecord('location', {}));
//        }
//        loc = this.get('location');
        var loc = this.store.createRecord('location', {});
        this.set('location',loc);
        loc.set('scope', loc.get('scope'));
        loc.set('scale', loc.get('scale'));
    }
})
;
