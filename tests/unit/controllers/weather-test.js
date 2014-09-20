import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:weather', 'WeatherController', {
    // Specify the other units that are required for this test.
    needs: ['model:location']
});

test('it builds a url if location is has lat and lon', function () {
    var controller = this.subject();

    Ember.run(function () {
        var location = Ember.Object.create({
            scale: 'F',
            scope: 5,
            lat: 10,
            lon: 20
        });
        var method = controller.get('urlForCurrentWeatherIn');
        var urlForCurrentWeather = method(location);
        var expectedUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=10&lon=20";
        //test location exists
        equal(urlForCurrentWeather, expectedUrl);
    });

});
