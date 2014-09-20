import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('location', 'Location', {
    // Specify the other units that are required for this test.
    needs: []
});

test('it exists', function () {
    var model = this.subject();
    // var store = this.store();
    ok(model);
});

test('it defaults the scope', function () {
    var model = this.subject();

    equal(model.get('scope'), 5, 'has default scope');
});

test('it defaults the scale', function () {
    var model = this.subject();

    equal(model.get('scale'), 'F', 'has default scale');
});

test('it is valid when complete', function () {
    expect(2);
    var model = this.subject({});

    // wrap asynchronous call in run loop
    Ember.run(function() {
        equal(model.isValid(), false, 'is not valid yet');

        model.set('name', 'Somewhere');
        model.set('country', 'Else');
        model.set('lat', 45.00);
        model.set('lon', 99.00);

        equal(model.isValid(), true, ' is now valid');
    });
});

