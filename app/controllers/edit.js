import Ember from 'ember';

/**
 * This Edit controller is badly named.
 * this is actually the create route, but it retains the current working record and saves out a new one when
 * commit is clicked
 *
 * Behavior:
 * - when trying to commit, the location is passed to the weather controller and is altered by the api lookup
 * - if the location is not found or a different name is returned, then the name is changed and you can resubmit
 *  to keep the change
 *      Example:
 *      - try to find '123'
 *      - the api returns 'Noida, India'.
 *      - The city, Noida, is set and a message is returned
 *      - To save, just commit again or change the name.
 * - Once a valid city/country combo is set, it will redirect to the index
 *
 * Notes:
 * - I hate the errorMessage mechanism. Given a more robust app and someone to ask,
 *  we could refactor this into a controller/route/model/view but all attempts at this hit a scoping brick wall.
 *
 * Roadmap suggestions:
 * - On key press, make the input do a lookup for the name/names
 * - Implement Delete
 * - Implement an Edit of a given location
 * - Implement an on demand location service lookup for when you have changed locations
 */
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
