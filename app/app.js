import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'weather', // TODO: loaded via config
  Resolver: Resolver,
  LOG_TRANSITIONS: true
});

//App.ApplicationAdapter = DS.FixtureAdapter;
App.ApplicationAdapter = DS.LSAdapter.create({
    namespace: 'api'
});

loadInitializers(App, 'weather');

export default App;
