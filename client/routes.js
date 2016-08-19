/**
Template Controllers

@module Routes
*/

/**
The app routes

@class App routes
@constructor
*/

// Change the URLS to use #! instead of real paths
// Iron.Location.configure({useHashPaths: true});

// Router defaults
Router.configure({
    layoutTemplate: 'layout_main',
    notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'}
        , 'layout_footer': {to: 'footer'}
    }
});

// ROUTES

/**
The receive route, showing the wallet overview

@method dashboard
*/

// Default route
Router.route('/', {
    template: 'views_home',
    name: 'home'
});

Router.route('/faq', {
    template: 'views_faq',
    name: 'faq'
});

Router.route('/list', {
    template: 'views_list',
    name: 'list'
});

Router.route('/find', {
    template: 'views_find',
    name: 'find'
});

Router.route('/stamp', {
    template: 'views_stamp',
    name: 'stamp'
});

Router.route('/tip', {
    template: 'views_tip',
    name: 'tip'
});

Router.route('/tech', {
    template: 'views_tech',
    name: 'tech'
});

