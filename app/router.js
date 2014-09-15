import Ember from 'ember';
import App from './app';

var Router = Ember.Router.extend({
    location: WeatherENV.locationType
});

Router.map(function () {
    this.route('index', {path: '/'});
    this.route('show', {path: '/:location_id'});
    this.route('edit', {path: '/:location_id/edit'});
    this.route('create');
    this.route('missing', { path: '/*path'});
});

App.MissingRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('index');
    }
});

export default Router;