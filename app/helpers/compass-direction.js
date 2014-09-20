import Ember from 'ember';

/**
 * Which way the wind blows...
 */
var compassValues = ['N','NE','E','SE','S','SW','W','NW'];
export default Ember.Handlebars.makeBoundHelper(function(value) {
    var mod = Math.floor((value - 12.5) % 8);
    return compassValues[mod];
});
