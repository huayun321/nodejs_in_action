/**
 * Created by yun on 14-11-8.
 */
var connect = require('connect');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
};

var app = connect();
app.use(logger);

app.listen(3000);
//return 404