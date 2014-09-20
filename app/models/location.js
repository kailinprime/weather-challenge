import DS from 'ember-data';

var Location = DS.Model.extend({
    name: DS.attr(),
    country: DS.attr(),
    scale: DS.attr('string', {defaultValue: 'F'}),
    scope: DS.attr('number', {defaultValue: 5}),
    lat: DS.attr('number', {defaultValue: null}),
    lon: DS.attr('number', {defaultValue: null}),
    isValid: function(){
        return (
            this.get('name') &&
            this.get('country') &&
            this.get('lat') &&
            this.get('lon')
        );
    }.observes('name','country','lat','lon')
});

Location.reopenClass({
    FIXTURES: [
        {id: 1, name: 'Milwaukee', country: 'WI', scale: 'F', scope: 5, lon: -87.91, lat:43.04},
        {id: 2, name: 'Chicago, IL', country: 'IL', scale: 'F', scope: 14, lon :-87.63, lat :41.88},
        {id: 3, name: 'London, GB', country: 'GB', scale: 'C', scope: 5, lon:-0.13, lat:51.51}
    ]
});

export default
Location;