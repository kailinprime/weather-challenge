import DS from 'ember-data';

var Location = DS.Model.extend({
    name: DS.attr(),
    scale: DS.attr('string', {defaultValue: 'F'}),
    scope: DS.attr('number', {defaultValue: 5}),
    lat: DS.attr('number', {defaultValue: null}),
    lon: DS.attr('number', {defaultValue: null}),
    currentUrl: function () {
        var scale = this.get('scale');
        var scaleParam = (scale === 'C') ? 'metric' : 'imperial';
        var cityParam = this.get('name');
        var latParam = this.get('lat');
        var lonParam = this.get('lon');
        var params = [];
        params.push('units=' + scaleParam);
        if ((cityParam === null || cityParam === '') && latParam !== null) {
            params.push('lat=' + latParam);
            params.push('lon=' + lonParam);
        } else {
            params.push('q=' + cityParam);
        }
        return 'http://api.openweathermap.org/data/2.5/weather?' + params.join('&');
    }.property('name','lat','lon','scale'),
    forecastUrl: function () {
        var scale = this.get('scale');
        var scaleParam = (scale === 'C') ? 'metric' : 'imperial';
        var scope = this.get('scope');
        var scopeParam = (scope === 5) ? 5 : 14;
        var cityParam = this.get('name');
        var latParam = this.get('lat');
        var lonParam = this.get('lon');
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
    }.property('name','lat','lon','scale','scope')
});

Location.reopenClass({
    FIXTURES: [
        {id: 1, name: 'Milwaukee, WI', scale: 'F', scope: 5, lon: -87.91, lat:43.04},
        {id: 2, name: 'Chicago, IL', scale: 'F', scope: 14, lon :-87.63, lat :41.88},
        {id: 3, name: 'London, GB', scale: 'C', scope: 5, lon:-0.13, lat:51.51}
    ]
});

export default
Location;