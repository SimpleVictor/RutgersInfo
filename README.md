## Rutgers Info
###[DEMO](https://rutgersinfo.herokuapp.com/)

<p align="center">
  <a href="">
    <img alt="Logo" src="https://github.com/VietAnhh/RutgersInfo/blob/master/whereru.png" width="100%">
  </a>
</p>

- Angular
- Google Map's API
- Yelps API
- Express
- SocketIO

# Set up Keys

Yelp's API
./routes/building.js
replace the following with your key you get from Yelp's console
```
  oauth_consumer_key : "<OAUTH_CONSUMER_KEY>";
  oauth_token : "<OAUTH_TOKEN>";


  var consumerSecret = "<CONSUMER_SECRET>";
  var tokenSecret = "<TOKEN_SECRET>";

```


Google's Map API
./public/index.html
replace the following key with your API key you get from google's developer console
```
  <script src="https://maps.googleapis.com/maps/api/js?key=<KEYHERE>"></script>

```


# Install dependencies
```
npm install
```

# start server
```
node ./bin/www
```


# Applciation url: http://localhost:3000
```
http://localhost:3000

```
