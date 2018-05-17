# React Flux Boilerplate

![Banner](http://i.imgur.com/HbhtYSh.png)

A simple pages transition boilerplate using React + Flux

## Technologies

- Babel | ES2015
- React + Flux
- page.js
- GSAP - TweenMax
- dom-hand
- Webpack
- ESLint
- SCSS + Rucksack
- Environment Detector with MobileDetect (mobile, tablet, webgl)

## Install dependencies
```
$ npm i
```

## Launch the project
```
$ npm start
```
The project will be launched at http://localhost:3000

## Build for production
```
$ npm run build
```

## Routing
Add your routes in `client/routes.js`.

## Wordpress
### Installation Locally
#### Setup DB
- Go to `./dump/*.sql`
- Find and replace
`http://react-flux-boilerplate-back.net/back` -> with your host name
`your_local_path/back` -> with your path
`react-flux-boilerplate` -> with your database name
- Import `dump/*.sql` to your `phpmyadmin`
- Go to `./back/wp-config.php` and change the db name with your name
- Go to `./client/constants/index.js` and change the API host to yours
- Test if `http://yourdomain.local/back/admin` works (Initial username: `admin` password: `pass`)
- Test if `http://yourdomain.local/back/wp-json/wp/v2/posts` api works too
- You are ready! 

#### EWWW Image optimizer
- Install graphicsmagick
https://devzone.zend.com/1559/manipulating-images-with-php-and-graphicsmagick/
- Install Imagick / ImageMagick (Locally if you use MAMP, you can easily activate them from the PHP section)
 
