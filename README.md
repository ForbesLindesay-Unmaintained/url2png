url2png
=======

node.js library for url2png

Get your account at [http://url2png.com/](http://url2png.com/)

## Installation


```
$ npm install url2png
```


Usage
-----
```javascript
var url2png = require('url2png')('API_KEY', 'PRIVATE_KEY');

var screenshotUrl = url2png.buildURL(url, options, type);

```

## Params
### Url
<table>
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">type</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>url</td>
      <td>string</td>
      <td>The <a href="https://www.google.com/search?q=urlencoded" target="_blank">url encoded</a> target url.</td>
    </tr>
  </tbody>
</table>

### Options
<table>
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">type</th>
      <th style="width: 50px;">default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>viewport</td>
      <td>string</td>
      <td>1280x1024</td>
      <td>The viewport for the browser. Max is 4000x4000</td>
    </tr>
    <tr>
      <td>fullpage</td>
      <td>boolean</td>
      <td>false</td>
      <td>Capture the entire page, even what is outside of the viewport.</td>
    </tr>
    <tr>
      <td>thumbnail_max_width</td>
      <td>pixels</td>
      <td>-</td>
      <td>Maximum width of image returned. If not specified image return will be 1:1.</td>
    </tr>
    <tr>
      <td>delay</td>
      <td>seconds</td>
      <td>-</td>
      <td><b>EXTRA</b> delay in seconds to handle flash animation.<br><i>You probably don't need this!<br>We work hard to detect the right time to take the screenshot.</i></td>
    </tr>
    <tr>
      <td>force</td>
      <td>boolean</td>
      <td>false</td>
      <td>Shall we use the cached version if it already exists?</td>
    </tr>
  </tbody>
</table>

### Type
<table>
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">type</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>type</td>
      <td>string</td>
      <td>'http', 'https' or empty for protocol-relative.</td>
    </tr>
  </tbody>
</table>

## Samples
```javascript
var url2png = require('url2png')('API_KEY', 'PRIVATE_KEY');

var options = {
	viewport : '900x600',
	thumbnail_max_width : 400
}

var type = 'http';

//Get the URL
var url = url2png.buildURL('google.com' options, type);

//...or download the image to a file
var fs = require('fs');
url2png.readURL('google.com' options, type).pipe(fs.createWriteStream('google.png'));

//...or send the image in the http response
var http = require('http');
http.createServer(function (req, res) {
  if (req.url === '/google.png') {
    url2png.readURL('google.com' options, type).pipe(res)
  }
});

```