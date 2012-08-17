var crypto = require('crypto');
var request = require('request');

module.exports = url2png;


function url2png(apiKey, privateKey) {
    var prefix = '//api.url2png.com/v3/';
    var lib = {};

    lib.buildURL = buildURL;
    function buildURL(url, width, height, type) {
        if (typeof url !== 'string') throw new Error('url should be of type string (something like www.google.com)');
        if (typeof width !== 'number') throw new Error('width should be a number');
        if (typeof height !== 'number') throw new Error('height should be a number');
        if (typeof type === 'undefined') type = '';
        if (typeof type !== 'string' || (type !== 'http' && type !== 'https' && type !== '')){
            throw new Error('If a type is provided it must be either the string \'http\', the ' + 
                'string \'https\' or the empty string if you want urls to be protocol-relative.  ' + 
                'You should probably go for domain relative if you are using it directly in a web ' +
                'page.');
        }

        var securityHash = crypto.createHash('md5').update(privateKey + '+' + url).digest("hex");
        return type + (type?':':'') + prefix + apiKey + '/' + securityHash + '/' + width + 'x' + height + '/' + url;
    }
    lib.readURL = readURL;
    function readURL(url, width, height, type) {
        console.log('get', buildURL(url, width, height, (type || 'http')));
        return request(buildURL(url, width, height, (type || 'http')));
    }
    return lib;
}