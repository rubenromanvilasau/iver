# Iver
### Your auction marketplace


## Tech

Iver uses a number of open source projects to work properly:

- [ReactJS] - HTML enhanced for web apps!
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]

## Github repository
[git-repo-url] 
[ruben]
 on GitHub.

## Installation

Iver requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies and start the server.

### Backend
##
```sh
cd iver/back
npm i
node app
```


### Frontend
```sh
cd iver/front
npm i
npm run dev
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
cd iver/back
npm run dev
```

Second Tab:

```sh
cd iver/front
npm run dev
```

#### Building for source

For production release:

```sh
cd iver/front
npm run build 
```

# Database

Database is currently a POSTGRESQL
you must run it locally
There is a creation script located in root folder of the project.


## License

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [ruben]: <https://github.com/rubenromanvilasau>
   [git-repo-url]: <https://github.com/rubenromanvilasau/iver.gitt>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [ReactJS]: <https://react.dev/>


