# Pixi Inspector

A extension to the Chrome DevTools for inspecting Pixi.js games/applications.

## Installation

Install (Pixi Inspector from the Chrome Web Store)[https://chrome.google.com/webstore/detail/pixi-inspector/aamddddknhcagpehecnhphigffljadon]

## Features

* Shows the scene graph 
* Shows property values of the selected node (read-only)
* Highlight (the bounds of) the selected node
* The selected node is available in the Console as `$pixi`


## Build instructions 

Install nodejs and dependancies: `npm install && npm install -g gulp` 

### Debugging/Testing
Run `gulp webpack-dev-server` and open http://localhost:8090/webpack-dev-server/tests/ in any browser.

### Rebuild chrome extension on every filechange:
`gulp continuous-build`

### Building chrome extension once:
`gulp build`
