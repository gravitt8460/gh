This is the web based front end for the BitCarbon Diamond Registry project

# Main Technologies used

1.  React - A JavaScript library for building user interfaces. The "View" in MVC
2.  Next.js - Framework for server-rendered or statically-exported React apps
3.  Semantic UI - A nice CSS framework. Compare this to Bootstrap
4.  Semantic-UI-React - Official React bindings for Semantic UI
5.  Redux - App level state management lib
6.  React-Redux - Official React bindings for Redux
7.  Redux-Thunk - Thunk middleware for Redux

# Other libs include

axios - Promise based HTTP client for the browser and node.js

## Installation

You'll need `npm` (or `yarn`).

After cloning this repository, change into its root directory and
execute the following commands:

```
$ npm install                   # Install NPM packages.
```

(You'll also need to rerun these commands whenever `package.json` or `package-lock.json` change, or when you change a Semantic-UI override or theme.)

## Development

### Development Server (using NEXT)

You need to have an instance of the bitcarbon.server Django
instance running somewhere you can access it. So be sure
to clone that repository and install it as needed --
or set up REACT_APP variables as mentioned below -- before
continuing.

To start a NEXT development server, execute:

```
$ npm run dev
```

This should bring up a browser that opens `http://localhost:3000`;
otherwise you can launch one yourself.

Any changes to `.js` or `.css` files will trigger a hot reload
of the current page.
