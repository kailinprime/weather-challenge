import DS from 'ember-data';
/**
 * name spacing for local storage
 */
export default DS.LSAdapter.extend({
    namespace: 'api'
});
