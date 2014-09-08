import Ember from 'ember';
var _ = window._;

export default
Ember.ObjectController.extend({
    errors: [],
    isEdit: false,
    tempScales: [
        {label: 'Fahrenheit', value: 'F'},
        {label: 'Celsius', value: 'C'}
    ],
    forecastScopes: [
        {label: '5 day', value: 5},
        {label: '14 day', value: 14}
    ],
    location: null,
    actions: {
        commit: function () {
            var me = this;
            var errors = [];
            var location = me.get('location');
            var uri = location.get('currentUrl');

            return Ember.$.ajax(uri)
                .done(function (data) {
                    if (data.cod !== 200) {
                        errors.push(data.cod + ' : ' + data.message);
                    } else {
                        var name = location.get('name');
                        var retName = (data && data.name) ? data.name : null;
                        var retCountry = (data && data.sys && data.sys.country) ? data.sys.country : null;
                        var retCombinedName = [retName, retCountry].join(',');
                        var lat = (data && data.coord && data.coord.lat) ? data.coord.lat : null;
                        var lon = (data && data.coord && data.coord.lon) ? data.coord.lon : null;

                        if (_.contains(retCombinedName.toLowerCase(), name.toLowerCase())) {
                            location.set('lon', lon);
                            location.set('lat', lat);
                            location.set('name', retCombinedName);

                            me.store.find('location',{name:location.get('name')})
                                .then(function(oldLocation){
                                    Ember.Logger.info('oldRecord', oldLocation);
                                    if(oldLocation){
                                        oldLocation.set('scope', location.get('scope'));
                                        oldLocation.set('scale', location.get('scale'));
                                        return location.deleteRecord()
                                            .then(function(){
                                                location = oldLocation;
                                            });
                                    }
                                })
                                .catch(function(){
                                    errors.push('Failed to delete record');
                                })
                                .finally(function(){
                                    location.save()
                                        .then(function (newLocation) {
                                            me.transitionToRoute('location.index',newLocation);
                                        },
                                        function () {
                                            errors.push('Failed to save location');
                                            me.set('errors', errors);
                                            me.set('location', location);
                                        });
                                });
                        } else {
                            errors.push('Name \'' + name + '\' lookup returned : \'' + retCombinedName + '\' at [' + lat + ',' + lon + ']');
                            location.set('name', '');
                            location.set('lon', null);
                            location.set('lat', null);
                        }
                    }
                })
                .always(function (e) {
                    errors.push(e.message);
                    me.set('errors', errors);
                    me.set('location', location);
                });
        }
    },
    init: function () {
        var loc = this.get('location');
        if (loc === null) {
            this.set('location', this.store.createRecord('location', {}));
        }
        loc = this.get('location');
        loc.set('scope', loc.get('scope'));
        loc.set('scale', loc.get('scale'));
    }
})
;
