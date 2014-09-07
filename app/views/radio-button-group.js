import Ember from 'ember';

export default Ember.View.extend({
    templateName: 'radio-button-group',
    classNames: ['radio-group', 'btn-group'],
    attributeBindings: ['dataToggle:data-toggle'],
    dataToggle: 'buttons',
    groupName: (function() {
        return "radiogroup-" + (Ember.guidFor(this));
    }).property(),
    change: function() {
        return this.set('value', this.$('input:checked').val());
    },
    updateSelected: (function() {
        var selected = this.$("input[value=" + (this.get('value')) + "]")[0];
        if (selected) {
            var parent = this.$(selected).parent();
            parent.trigger('click');
            return selected.checked = true;
        }
    }).observes('value'),
    didInsertElement: function() {
        return this.updateSelected();
    }
});