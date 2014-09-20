import Ember from 'ember';

var Router = Ember.Router.extend({
    location: WeatherENV.locationType
});

/**
 * Started using a resource but it turned into an ordeal. reverted to explicitly named routes.
 */
Router.map(function () {
    this.route('index', {path: '/'});
    this.route('show', {path: '/:location_id'});
    this.route('edit', {path: '/:location_id/edit'});
    this.route('create');
    this.route('missing', { path: '/*path'});
});

export default Router;