import DS from 'ember-data';

var Error = DS.Model.extend({
    message: DS.attr()
});

export default Error;