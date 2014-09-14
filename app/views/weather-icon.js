import Ember from 'ember';

export default Ember.View.extend({
    classNameBindings: ['iconName'],
    iconName: function(){
        return 'owm-' + this.get('value');
    }.property()
});
