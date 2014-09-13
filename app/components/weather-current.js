import Ember from 'ember';

export default Ember.Component.extend({
    hasModel: Ember.computed.equal('model.readyState',1),
    model: null
});
