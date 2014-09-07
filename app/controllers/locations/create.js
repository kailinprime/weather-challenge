import Ember from 'ember';

export default Ember.ObjectController.extend({
    isEdit: false,
    location: null,
    actions: {
        commit: function(){
            var me = this;
            var loc = me.get('location');
            Ember.Logger.info('Save created location',loc);
            loc.save();
//                .then(function(){
//                    me.transitionTo('locations');
//                }.bind(this))

        }
    }
});
