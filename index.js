var crypto = require('crypto');
var request = require('request');

module.exports = url2png;

function url2png(apiKey, privateKey) {
    var prefix = '//api.url2png.com/v6/';
    var format = 'png'
    var lib = {};

    function buildURL(url, options) {
        options = options || {};
        if(typeof url !== 'string') throw new Error('url should be of type string (something like www.google.com)');
        if(options.viewport && (typeof options.viewport !== 'string' || !options.viewport.match(/\d+x\d+/))) throw new Error('viewport should be a string with the format "{width}x{height}"');
        if(options.fullpage && typeof options.fullpage !== 'boolean') throw new Error('fullpage should be a boolean');
        if(options.thumbnail_max_width && typeof options.thumbnail_max_width !== 'number') throw new Error('thumbnail_max_width should be a number in pixels');
        if(options.delay && typeof options.delay !== 'number') throw new Error('delay should be a number in seconds');
        if(options.force && typeof options.force !== 'boolean') throw new Error('force should be a boolean');
        if(options.protocol && options.protocol != 'https' && options.protocol != 'http') throw new Error('protocol should either be "https" or "http"');
        options.protocol = options.protocol || '';

        url = 'url=' + encodeURIComponent(url);
        var optionsQuery = '';
        for(var option in options) {
            if (option != 'protocol')
                optionsQuery += "&" + [option, options[option]].join('=');
        }

        var securityHash = crypto.createHash('md5').update('?' + url + optionsQuery + privateKey).digest("hex");
        return (options.protocol ? options.protocol + ':' : '') + prefix + apiKey + '/' + securityHash + '/' + format + '/?' + url + optionsQuery;
    }

    function readURL(url, options) {
        options = options || {};
        options.protocol = options.protocol || 'https';
        return request(buildURL(url, options));
    }

    lib.buildURL = buildURL;

    lib.readURL = readURL;

    return lib;
}