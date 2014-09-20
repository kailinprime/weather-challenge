# Weather Application Challenge

This application was built with ember-cli.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

## Deploying

* copy the dist directory to the server
* serve the directory as an application

# Challenge Parameters
## Required

* Well Structured 
> used ember-cli to enforce

* Well Documented 
> opinions may vary

* Handle Errors Gracefully 
> a better solution would be to have a globally accessible reporting, but getting the scope to behave proved ugly
> simply alert and controller only scoped error messaging was used

* Tested
> some tests written to show how, but the coverage is terrible and purely for show.
> under normal circumstance, a TDD approach would be have been taken.
> code coverage is ... well it is terrible.

* Static
> EmberJS 101... may the gurus forgive me...

* Client side JS
> jQuery ajax calls to the [Open Weather API](www.openweathermap.org/api)

## Optional
* Data Caching
> use of local storage for data store

* Mobile iOS / Android
> Bootstrap check through emulator only

* Iconography
> Added Font Awesome
> Outright stole the images from [Open Weather API Conditions and Icons](http://openweathermap.org/weather-conditions) 
> ... trust me... it's better this way.

* Themes
> Not today Galvatron!

* Automated Build
> Ember CLI
> Brocolli
> LESS via Brocolli
> Lodash via Brocolli

## Enhancements / Missing Features
* DELETE / EDIT functionality for locations
* Re-poll for current location
* Better display of errors
* Look-a-head when entering the name
* Better testing
