import Ember from 'ember';

/**
 * Navigation
 * - watch for and jump to locations
 * - prevent click event from firing after toggling on the current route
 */
export default Ember.Component.extend({
    hasLocations: function () {
        var locations = this.get('locations');
        var hasLocations = false;
        locations.forEach(function (loc) {
            if (loc.get('name')) {
                hasLocations = true;
            }
        });
        return hasLocations;
    }.property('locations.@each.name'),
    locations: null,
    actions: {
        close: function () {
            var navbarToggle = this.$('.navbar-toggle');
            if (navbarToggle.is(':visible')) {
                navbarToggle.trigger('click');
                event.preventDefault(); // prevent the browser from following the link as normal
                if (this.bubbles === false) { event.stopPropagation(); }
            }
        }
    }
});