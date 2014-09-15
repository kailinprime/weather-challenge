import Ember from 'ember';

export default Ember.ObjectController.extend({
    init: function(){
        var model = this.get('model');
        if(model){
            Ember.Logger.info('show controller', model.get('id'));
        }else{
            Ember.Logger.info('show controller no model');
        }
    }
});