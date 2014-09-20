import Ember from 'ember';
var _ = window._;

/**
 * Location controller is where the magic happens:
 *
 * Note:
 *  - Hate errorMessage mechanism. After much headache, this solution of a local handler and message is enough.
 *
 */
export default Ember.ObjectController.extend({
    errorMessage: null,
    addError: function(msg){
        this.set('errorMessage', msg);
    },
    clearError: function(){
        this.set('errorMessage', null);
    },
    /**
     * takes a location and builds the url for retrieving current weather for a location
     */
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
    /**
     * takes a location and builds the url for retrieving forecast weather for a location
     */
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
    /**
     * Get the forecast using a location
     * - Does not mutate the location
     */
    currentForecast: function (location) {
        var me = this;
        me.clearError();
        var uri = me.urlForForecastIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                return data;
            })
            .fail(function (e) {
                this.addError('currentForecast:' + e.message);
            });
    },
    /**
     * Get the current weather using a location
     * - Does not mutate the location
     */
    currentWeather: function (location) {
        var me = this;
        me.clearError();
        var uri = me.urlForCurrentWeatherIn(location);
        return Ember.$.ajax(uri)
            .done(function (data) {
                return data;
            })
            .fail(function (e) {
                me.addError('currentWeather:' + e.message);
            });
    },
    /**
     * Use a location and the api to get a valid location
     * - Mutates the name, country, lat and lon depending on the return value from the api.
     * - Has some weirdness where certain values return valid locations.
     * - If a location is not found, report the error
     * - Validates the name agains the name and country, setting the name if they done' checkout.
     *      Example:
     *          - name = 123
     *          - returns Noida, India.
     *          - locationVerification sets the name = 'Noida'
     *          and allows for the verification step to be run again
     */
    locationVerification: function (location) {
        var me = this;
        me.clearError();
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
    /**
     * If you don't allow the browser to show your location, you can still use the service by adding a location manually
     */
    gavePermission: false,
    browserLocation: function (location) {
        var me = this;
        me.clearError();
        var n = navigator;
        if (n.geolocation) {
            n.geolocation.getCurrentPosition(function (position) {
                me.set('gavePermission',true);
                location.set('lat', position.coords.latitude);
                location.set('lon', position.coords.longitude);
                return location;
            });
        } else {
            return location;
        }
    }
});
