var express =require('express');
var router = express.Router();

var photos = [];
photos.push({
    name: 'node.js logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

//exports.list = function(req, res) {
//    res.render('photos', {
//        title: 'Photos',
//        photos: photos
//    });
//};
//middleware specific to this router
router.use(function timeLog(req, res, next) {
   console.log('Time:', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
});

module.exports = router;

