import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['weather'],
    location: null,
    current: function(){
        var me = this;
        var weatherController = me.get('controllers.weather');
        var location = me.get('location');
        return weatherController.currentWeather(location);
    }.property('location'),
    forecast: function(){
        var me = this;
        var weatherController = me.get('controllers.weather');
        var location = me.get('location');
        return weatherController.currentForecast(location);
    }.property('location'),
    init: function() {
        var me = this;
        var location = me.get('location');
        if(!location){
            location = me.store.createRecord('location');
        }
        me.set('location', location);

        var weatherController = me.get('controllers.weather');
        weatherController.browserLocation(location);
    }
});