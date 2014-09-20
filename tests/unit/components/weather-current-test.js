import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('weather-current', 'WeatherCurrentComponent', {
    // specify the other units that are required for this test
    needs: [
        'helper:compass-direction',
        'helper:date-format',
        'helper:wind-speed'
    ]
});

test('it renders the error when no model is supplied', function () {
    // expect 4 assertions
    expect(2);
    // creates the component instance
    var component = this.subject();

    // component dom instance
    var $component = this.append();

    // verify that the error div does not appear
    equal($component.find('li:contains("Current temperature is")').length, 0, 'should not have temperature');
    equal($component.find('h3:contains("Current weather loading")').length, 1, 'should have error message');
});

test('it renders the error when no model is supplied', function () {
    // expect 4 assertions
    expect(2);
    // creates the component instance
    var component = this.subject();

    // component dom instance
    var $component = this.append();

    // add a model that is not null
    Ember.run(function () {
        component.set('model', {
            main: {
                temp: 99,
                temp_min: 88,
                temp_max: 102,
                humidity: 98.7
            },
            weather: [
                {
                    main: 'Cloudy',
                    description: 'With chance of meatballs'
                }
            ],
            wind: {
                speed: 25,
                deg: 90
            }
        });
    });

    Ember.run(function () {
        component.set('scale', 'F');
    });

    // verify that the error div does not appear
    equal($component.find('li:contains("Current temperature is")').length, 1, 'should have temperature');
    equal($component.find('h3:contains("Current weather loading")').length, 0, 'should have error message');
});
