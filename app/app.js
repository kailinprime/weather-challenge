import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
    modulePrefix: 'weather', // TODO: loaded via config
    LOG_TRANSITIONS: true,
    Resolver: Resolver
});

/**
 * never got the fixtures to work with a local storage.
 */
//App.ApplicationAdapter = DS.FixtureAdapter;

App.ApplicationAdapter = DS.LSAdapter.create({
    namespace: 'api'
});

loadInitializers(App, 'weather');

export default App;
