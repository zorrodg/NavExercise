'use strict';


module.exports = function(app) {

    app.get('/api/nav', function(req, res, next) {

        res.send({
            navItems: [{
                work: []
            }, {
                about: ['What we do', 'How we work', 'Leadership']
            }, {
                careers: ['Client Services', 'Creative', 'Motion & Media', 'Operations', 'People', 'Strategy', 'Technology', 'UX & Product Design']
            }, {
                news: []
            }, {
                events: []
            }, {
            	contact: ['Atlanta', 'Brooklyn', 'DC', 'London', 'Los Angeles', 'Portland', 'Rio', 'San Fransisco']
            }]
        });

    });

};
