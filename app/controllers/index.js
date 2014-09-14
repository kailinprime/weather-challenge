import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['weather'],
    location: null,
    current: null,
    forecast: null,
    tempScales: [
        {label: 'Fahrenheit', value: 'F'},
        {label: 'Celsius', value: 'C'}
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
    init: function() {
        var me = this;
        var location = me.get('model');
        if(!location){
            location = me.store.createRecord('location');
            Ember.Logger.info('index.init', location.get('id'));
        }

        var weatherController = me.get('controllers.weather');
        weatherController.browserLocation(location);
        me.set('location', location);
    }
});