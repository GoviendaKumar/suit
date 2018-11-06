

# About

This project is about an interactive suit. How to use NodeJs and Webpack, see for the __Introduction in DEV Environment__ section.
# Electron installation Mac
- use following commands to install electron if permission error occurs
  `sudo npm install -g electron --unsafe-perm=true --allow-root`
- download `asoundlib.h` ubuntu package if midi doesn't work
   https://packages.ubuntu.com/search?lang=hu&suite=lucid&arch=amd64&mode=filename&searchon=contents&keywords=asoundlib.h
  
# Quick Start
- pull from git
- cd to the root of the project
- `npm i` to download and compile all required modules
- `./node_modules/.bin/electron-rebuild` to recompile some native modules
- `npm start electron.watch` to watch the project
- `npm start electron.build` to build the final release

# Used Hardware
- any pc, acts as a server & same time as a ui
- arduino
- sensors
- attachable midi & other controllers

# Used Software
- nodejs (npm), webpack, es6, sass, electron
- for more information about used packages see sections `"dependencies" : {}` and `"devDependencies" : {}` in `./package.json`

# Introduction in DEV Environment

#### NodeJs

- What is __NodeJS__? NodeJs is a server side JavaScript. Requires installation from the official website. Executable from Command Line Interface. For more information see: https://nodejs.org/en/

- What is __npm__? Npm is a Node Package Manager aka javascript module standard, aka a big library with modules. For more information see: https://www.npmjs.com

	- to start the project, input `npm init` and fullfill the application passport. It is created in the root folder and calls `./package.json`.
	
	- `./package.json` contains different informations about the node application, especially `dependencies` and `devDependencies`.
	
	- `dependencies` are modules used in the application.
	
	- `devDependencies` are modules used to develop, maintain and transpile and compile the application.
	
	- to install a `dependency` execute `npm install {module-name} -S` or `npm i {module-name} -S`. The module is installed in the `./node_modules/` folder.
	
	- to install a `devDependencie` execute `npm i {module-name} -D` 
	
	- why do we need a register of dependencies in `./package.json`? Before upload to git, you can free up the space of your application folder by deleting the `./node_modules/` folder, because it take a lot of disk space. By donwloading the raw project from the repository, just pull all the dependencies from the npm library by executing `npm install` or `npm i` 
	
	- to see installed modules `npm ls -depth 0`

#### Webpack

- What is __webpack__? Webpack is an dev module that cares about packaging (usage of es6 modules), transpiling (translating one programming language into another), watching (retranspile on file save while developing), building (to build the final product, compress, uglify) the application and also provides a development server for the client.

- where sitts the configuration file of webpack? It's digged in `./dev/src/webpack.js`

- why do we need webpack? In order to use lastest es6 (newest JavaScript version), to use es6 modules and transpiling the sass dialect of css we need this funky setup.

# Author
- Aziz Niyazov

- Anton Kluev
	- dev@antonkluev.com
	- https://github.com/antonkluev
	- https://github.com/GoviendaKumar


