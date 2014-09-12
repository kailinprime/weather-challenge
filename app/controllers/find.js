import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['weather'],
    isNew: Ember.computed.alias('model.isNew'),
    current: null,
    forecast: null,
    actions: {
        currentWeather: function () {
            var weatherController = this.get('controllers.weather');
            var model = this.get('model');
            me.set('current',null);

            weatherController.currentWeather(model)
                .done(function(report){
                    me.set('current',report);
                });
        },
        forecastWeather: function () {
            var weatherController = this.get('controllers.weather');
            var model = this.get('model');
            me.set('forecast',null);

            return weatherController.currentForecast(model)
                .done(function(report){
                    me.set('forecast',report);
                });;
        }
    }
});