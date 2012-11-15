
/**
 * Module dependencies.
 */

var express = require('express')  
  , http = require('http')
  , url = require('url')
  , path = require('path')
  , home = require('./routes/home')
  , login = require('./routes/login')
  , wall = require('./routes/wall');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'blah' }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

authenticate = function(req, res) {
  console.log('Authenticating...');
  if(!req.session.access_token){
      res.redirect('/login');
    }
    else
      console.log('Authenticated.');
}


app.get('/', home.index);
app.get('/login', login.index);
app.get('/wall', wall.index);
app.get('/wall/tickets', wall.tickets);




app.get('/wall', function(req, res) { res.send('wall', 200) });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
