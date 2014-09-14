import Ember from 'ember';

var days = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday', 'Friday','Saturday'];
export default Ember.Handlebars.makeBoundHelper(function (value) {
    var date = new Date(parseInt(value * 1000));
    return days[date.getDay()] + ' ' + date.getMonth() + '/' + date.getDate();
});
