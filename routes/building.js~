var express = require('express');
var oauthSignature = require('oauth-signature');
var fs = require('fs');
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');
var router = express.Router();

/* GET home page. */
router.get('/buildings', function(req, res, next) {
  
  function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
      if(err) {
        callback(err);
        return;
      }
      try {
        callback(null, JSON.parse(data));
      } catch(exception) {
        callback(exception);
      }
    });
  };
  readJSONFile('./buildings.json', function (err, json) {
  if(err) { throw err; }
    res.send(json);
  });
  
});


var request_yelp = function(set_parameters, callback) {

  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    term: 'restaurant',
    location: 'Rutgers+Street,+New+Brunswick,+NJ',
    sort: '1'
  };
  

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : "<OAUTH_CONSUMER_KEY>",
    oauth_token : "<OAUTH_TOKEN>",
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  /* We combine all the parameters in order of importance */ 
  var parameters = _.assign(default_parameters, set_parameters, required_parameters);
  console.log(parameters);
  
  /* We set our secrets here */
  var consumerSecret = "<CONSUMER_SECRET>";
  var tokenSecret = "<TOKEN_SECRET>";

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

};

router.post('/yelp', function(req, res, next){
  console.log(req.body);
  if(req.body.term){
    request_yelp({
        term: req.body.term,
        sort: req.body.myoption,
        limit: 20,
        offset: 20,
      }, function(err, response, body){
        res.send(response);
      });
  }else{
    request_yelp({
      limit: 20
    }, function(err, response, body){
      res.send(response);
    });
  };  
});


module.exports = router;
