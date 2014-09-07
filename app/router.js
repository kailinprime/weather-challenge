import Ember from 'ember';
import App from './app';

var Router = Ember.Router.extend({
  location: WeatherENV.locationType
});

Router.map(function() {
    this.resource('locations', function(){
        this.resource('location', {path:'/:location_id'}, function(){
           this.route('edit');
        });
        this.route('create');
    });
    this.route('missing', { path: '/*path'});
});

App.MissingRoute = Ember.Route.extend({
    redirect: function(){
        this.transitionTo('locations.index');
    }
});

export default Router;
