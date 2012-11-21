var crypto = require('crypto');
var request = require('request');

module.exports = url2png;


function url2png(apiKey, privateKey) {
    var prefix = '//api.url2png.com/v6/';
    var format = 'png'
    var lib = {};

    lib.buildURL = buildURL;
    function buildURL(url, options, type) {
        if (typeof url !== 'string') throw new Error('url should be of type string (something like www.google.com)');
        if (options.viewport && (typeof options.viewport !== 'string' || !options.viewport.match(/\d+x\d+/) )) throw new Error('viewport should be a string with the format "{width}x{height}"');
        if (options.fullpage && typeof options.fullpage !== 'boolean') throw new Error('fullpage should be a boolean');
        if (options.thumbnail_max_width && typeof options.thumbnail_max_width !== 'number') throw new Error('thumbnail_max_width should be a number in pixels');
        if (options.delay && typeof options.delay !== 'number') throw new Error('delay should be a number in seconds');
        if (options.force && typeof options.force !== 'boolean') throw new Error('force should be a boolean');        
        if (typeof type === 'undefined') type = '';
        if (typeof type !== 'string' || (type !== 'http' && type !== 'https' && type !== '')){
            throw new Error('If a type is provided it must be either the string \'http\', the ' + 
                'string \'https\' or the empty string if you want urls to be protocol-relative.  ' + 
                'You should probably go for domain relative if you are using it directly in a web ' +
                'page.');
        }

        url = 'url=' + encodeURIComponent(url);
        var optionsQuery = '';
        for(var option in options){
            optionsQuery += "&" + [option, options[option]].join('=');
        }

        var securityHash = crypto.createHash('md5').update('?' + url + optionsQuery + privateKey).digest("hex");
        return type + (type?':':'') + prefix + apiKey + '/' + securityHash + '/' + format + '/?' + url + optionsQuery;
    }
    lib.readURL = readURL;
    function readURL(url, options, type) {
        return request(buildURL(url, options, (type || 'http')));
    }
    return lib;
}