import Ember from 'ember';

/**
 * Display the current weather and forecast for a location
 *
 * Notes:
 * - Allow the location services or click 'Add Location' to get started
 * - On any location, if you change the scale or the forecast, the lookup is repeated
 */
export default Ember.ObjectController.extend({
    needs: ['weather'],
    location: null,
    current: null,
    forecast: null,
    tempScales: [
        {label: 'Fahrenheit / MPH', value: 'F'},
        {label: 'Celsius / KPH', value: 'C'}
    ],
    forecastScopes: [
        {label: '5 day', value: 5},
        {label: '14 day', value: 14}
    ],
    getCurrent: function(){
        var me = this;
        var location = me.get('location');
        if(location) {
            me.set('current', null);
            var weatherController = me.get('controllers.weather');
            weatherController.currentWeather(location)
                .done(function (data) {
                    me.set('current', data);
                });
        }
    }.observes('location.name', 'location.scale'),
    getForecast: function(){
        var me = this;
        var location = me.get('location');
        if(location){

        me.set('forecast', null);
        var weatherController = me.get('controllers.weather');
        weatherController.currentForecast(location)
            .done(function (data) {
                me.set('forecast', data);
            });
        }
    }.observes('location.name', 'location.scale', 'location.scope'),
    getLocationVerification: function(){
        var me = this;
        var location = me.get('location');
        if(location) {
            var weatherController = me.get('controllers.weather');
            weatherController.locationVerification(location);
        }
    }.observes('location.lon'),
    missingPermission: function(){
        return !this.get('controllers.weather').get('gavePermission');
    }.property('controllers.weather.gavePermission'),
    init: function() {
        var me = this;
        var location = me.get('model');
        if(!location){
            location = me.store.createRecord('location');
            var weatherController = me.get('controllers.weather');
            weatherController.browserLocation(location);
        }

        me.set('location', location);
    }
});