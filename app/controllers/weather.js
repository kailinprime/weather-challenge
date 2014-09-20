import Ember from 'ember';
var _ = window._;

export default Ember.ObjectController.extend({
    needs: ['error'],
    error: Ember.computed.alias('controllers.error'),
    addError: function(msg){
        this.get('error').addError(msg);
    },
    urlForCurrentWeatherIn: function (location) {
        var me = this;
        try {
            var scale = location.get('scale');
            var scaleParam = (scale === 'C') ? 'metric' : 'imperial';
            var city = location.get('name');
            city = (city) ? city.split(',')[0] : null;
            var country = location.get('country');
            var cityParam = _.compact([city,country]).join(',');
            var latParam = location.get('lat');
            var lonParam = location.get('lon');
            var params = [];
            params.push('units=' + scaleParam);
            if ((cityParam === null || cityParam === '') && latParam !== null && lonParam !== null) {
                params.push('lat=' + latParam);
                params.push('lon=' + lonParam);
            } else {
                params.push('q=' + cityParam);
            }
            return 'http://api.openweathermap.org/data/2.5/weather?' + params.join('&');
        } catch (e) {
            me.addError('urlForCurrentWeatherIn:' + e.message);
        }
    },
    urlForForecastIn: function (location) {
        var me = this;
        try {
            var scale = location.get('scale');
            var scaleParam = (scale === 'C') ? 'metric' : 'imperial';
            var scope = location.get('scope');
            var scopeParam = (scope === '5') ? 5 : 14;
            var city = location.get('name');
            city = (city) ? city.split(',')[0] : null;
            var country = location.get('country');
            var cityParam = _.compact([city, country]).join(',');
            var latParam = location.get('lat');
            var lonParam = location.get('lon');
            var params = [];
            params.push('units=' + scaleParam);
            params.push('cnt=' + scopeParam);
            params.push('mode=json');

            if (latParam !== null) {
                params.push('lat=' + latParam);
                params.push('lon=' + lonParam);
            } else {
                params.push('q=' + cityParam);
            }
            return 'http://api.openweathermap.org/data/2.5/forecast/daily?' + params.join('&');
        } catch (e) {
            me.addError('urlForForecastIn:' + e.message);
        }
    },
    currentForecast: function (location) {
        var me = this;
        var uri = me.urlForForecastIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                return data;
            })
            .fail(function (e) {
                this.addError('currentForecast:' + e.message);
            });
    },
    currentWeather: function (location) {
        var me = this;
        var uri = me.urlForCurrentWeatherIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                return data;
            })
            .fail(function (e) {
                me.addError('currentWeather:' + e.message);
            });
    },
    locationVerification: function (location) {
        var me = this;
        var uri = me.urlForCurrentWeatherIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                if (data.cod !== 200) {
                    me.addError('locationVerification:' + data.cod);
                } else {
                    var name = location.get('name');
                    var retName = (data && data.name) ? data.name.split(',')[0] : null;
                    var retCountry = (data && data.sys && data.sys.country) ? data.sys.country : '';
                    var retCombinedName = _.compact([retName, retCountry]).join(',');
                    var lat = (data && data.coord && data.coord.lat) ? data.coord.lat : null;
                    var lon = (data && data.coord && data.coord.lon) ? data.coord.lon : null;

                    if (name && !_.contains(retCombinedName.toLowerCase(), name.toLowerCase())) {
                        var msg = 'Name \'' + name + '\' lookup returned : \'' + retCombinedName + '\' at [' + lat + ',' + lon + ']';
                        me.addError(msg);
                    }
                    location.set('lon', lon);
                    location.set('lat', lat);
                    location.set('name', retName);
                    location.set('country', retCountry);
                }
                return location;
            })
            .fail(function (e) {
                me.addError('locationVerification:' + e.message);
            });
    },
    browserLocation: function (location) {
        var n = navigator;
        if (n.geolocation) {
            n.geolocation.getCurrentPosition(function (position) {
                location.set('lat', position.coords.latitude);
                location.set('lon', position.coords.longitude);
                return location;
            });
        } else {
            return location;
        }
    }
});
