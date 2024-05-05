# Robox - Drag n' Drop block coding webpage

### Installation

*(Node is required for set up.)*

Clone the repository into a location of your choice.

In a command line, set up Node.js dependencies.

```
npm install
```

If not already installed, install nodemon for server auto-reload.

```
npm install -g nodemon
```

To run the command:

```
nodemon --ignore ./dist/ -e html,css,js --exec npm run start
```

Server will connect to a local server on port `3000` (`127.0.0.1:3000` or `localhost:3000`).