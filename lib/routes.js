'use strict';


module.exports = function(app) {

    app.get('/api/nav', function(req, res, next) {

    	res.send({
    		navItems: [
    			{title: 'Nav 1', content: 'Nav Content 1'},
    			{title: 'Nav 2', content: 'Nav Content 2'},
    			{title: 'Nav 3', content: 'Nav Content 3'},
    			{title: 'Nav 4', content: 'Nav Content 4'},
    			{title: 'Nav 4', content: 'Nav Content 5'}
    		]
    	});

    });

};
