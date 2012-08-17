url2png
=======

node.js library for url2png


Usage
-----

```javascript

var url2png = require('url2png')('API_KEY', 'PRIVATE_KEY');

url2png.buildURL('google.com', 300, 300);
// -> '//api.url2png.com/v3/API_KEY/SECURITY_HASH/300x300/google.com'

url2png.buildURL('google.com', 300, 300, 'http');
// -> 'http://api.url2png.com/v3/API_KEY/SECURITY_HASH/300x300/google.com'

url2png.buildURL('google.com', 300, 300, 'https');
// -> 'https://api.url2png.com/v3/API_KEY/SECURITY_HASH/300x300/google.com'


var fs = require('fs');
url2png.readURL('google.com', 300, 300).pipe(fs.createWriteStream('google.png'));

var http = require('http');
http.createServer(function (req, res) {
  if (req.url === '/google.png') {
    url2png.readURL('google.com', 300, 300).pipe(res)
  }
});

```
