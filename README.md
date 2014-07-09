Huge Navigation Exercise
=========

This exercise will have the candidate build a responsive site nav that's driven from a JSONP call. 

Here are the guidelines for this exercise

  - No Frameworks
  - No JQuery (err, maybe not if this is comign from JSONP)
  - Chrome compliance is all that's required, all functions and features available in Chrome are in play
  - Nav must be responsive

Nice to have's:
  - Adherence to accessibility standards
  - Documentation
  - Unit and/or E2E tests

At a high level the Nav will have 2 main states

  - <768px: Mobile. Hamburger icon will display in the top-left of the page. Clicking the hamburger will cause a card to slide in and overlay the content from the left. The card will contain nav and sub-nav items defined in the JSONP response
  - \>= 768px: Desktop. The nav will display as a horizontal nav. Top level nav items will display sub-nav items when clicked. No hamburger will be shown.

Version
----

1.0

Files
-----------

* Mockup - Illustrator file describing how the nav should behave
* server.js - node.js server that will host the site and provie the api to construct the nav

API
------------

* GET /api/nav - returns a JSON responsve representing the items in the nav.

