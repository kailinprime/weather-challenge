import Ember from 'ember';

/**
 * Use the scale value to return the correct wind speed label
 */
export default Ember.Handlebars.makeBoundHelper(function (value) {
    return (value === 'F') ? ' mph' : ' kph';
});
