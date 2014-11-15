var app =require('./app');

app.set('port', process.env.port || 3000);
app.set('title', 'my application');


var server = app.listen(app.get('port'), function() {
   console.log('express server listening on server:%s:%s',
       server.address().address,
        server.address().port);
});