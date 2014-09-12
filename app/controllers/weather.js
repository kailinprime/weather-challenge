import Ember from 'ember';
var _ = window._;

export default
Ember.ObjectController.extend({
    error: null,
    urlForCurrentWeatherIn: function (location) {
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
            Ember.Logger.info('urlForCurrentWeatherIn', location);
            throw e;
        }
    },
    urlForForecastIn: function (location) {
        try {
            var scale = location.get('scale');
            var scaleParam = (scale === 'C') ? 'metric' : 'imperial';
            var scope = location.get('scope');
            var scopeParam = (scope === 5) ? 5 : 14;
            var city = location.get('name');
            city = (city) ? city.split(',')[0] : null;
            var country = location.get('country');
            var cityParam = _.compact([city,country]).join(',');
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
            Ember.Logger.info('urlForForecastIn', location);
            throw e;
        }
    },
    currentForecast: function (location) {
        var me = this;
        me.set('error', null);
        var uri = me.urlForForecastIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                if (data.cod !== 200) {
                    me.set('error', 'Error [' + data.cod + '] retrieving forecast: ' + data.message);
                } else {
                    return data;
                }
            })
            .fail(function (e) {
                me.set('error', e.message);
            });
    },
    currentWeather: function (location) {
        var me = this;
        me.set('error', null);
        var uri = me.urlForCurrentWeatherIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                if (data.cod !== 200) {
                    me.set('error', 'Error [' + data.cod + '] retrieving current weather: ' + data.message);
                } else {
                    return data;
                }
            })
            .fail(function (e) {
                me.set('success', false);
                me.set('error', e.message);
            });
    },
    locationVerification: function (location) {
        var me = this;
        me.set('error', null);
        var uri = me.urlForCurrentWeatherIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                if (data.cod !== 200) {
                    me.set('error', data.cod + ' : ' + data.message);
                } else {
                    var name = location.get('name');
                    var retName = (data && data.name) ? data.name.split(',')[0] : null;
                    var retCountry = (data && data.sys && data.sys.country) ? data.sys.country : null;
                    var retCombinedName = [retName, retCountry].join(',');
                    var lat = (data && data.coord && data.coord.lat) ? data.coord.lat : null;
                    var lon = (data && data.coord && data.coord.lon) ? data.coord.lon : null;

                    if (!_.contains(retCombinedName.toLowerCase(), name.toLowerCase())) {
                        var msg = 'Name \'' + name + '\' lookup returned : \'' + retCombinedName + '\' at [' + lat + ',' + lon + ']';
                        me.set('error', msg);
                    }
                    location.set('lon', lon);
                    location.set('lat', lat);
                    location.set('name', retName);
                    location.set('country', retCountry);
                }
                return location;
            })
            .fail(function (e) {
                me.set('error', e.message);
                return location;
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
