import Ember from 'ember';

export default Ember.Component.extend({
    title: function(){
        var model = this.get('model');
        return ((model && model.name) ? model.name : 'Current') + ' Weather';
    }.property('model'),
    hasModel: function(){
        return (this.get('model') !== null);
    }.property('model'),
    model: null
});
