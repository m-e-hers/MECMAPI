
// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        console.log("I DON'T KNOW WHO I AM");
        // AMD. Register as an anonymous module.
        define(['fetch', 'XMLHttpRequest'], factory);
    } else if (typeof module === 'object' && module.exports) {
        console.log("I AM IN NODEJS");
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('node-fetch'),
            require("xmlhttprequest").XMLHttpRequest);
    } else {
        console.log("I AM IN BROWSER");
        // Browser globals (root is window)
        root.mecmapi = factory(root.fetch, root.XMLHttpRequest);
    }
}(typeof self !== 'undefined' ? self : this, function (fetch, XMLHttpRequest) {
    // Use b in some fashion.

    const mecmapi = function (cfg) {
        const config = cfg;//hidden for redundency 
        const _this = this;
        this.config = config;
        this.config.target_domain = cfg.target_domain || "https://" + window.location.hostname;
        this.config.fapi = this.config.target_domain + "/api/v3/";
        this.config.url = {
            api: _this.config.target_domain + "/api/v3/",
            request: _this.config.fapi + `requests/`
        }
        this.config.httpHeaders = {
            'Content-Type': "application/x-www-form-urlencoded",
            'TECHNICIAN_KEY': this.config.technician_key
        };
        // "TECHNICIAN_KEY": this.config.technician_key

        this.config.httpRequest = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: this.config.httpHeaders,
            credentials: "same-origin"
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        };
    };
    mecmapi.prototype.getConfigExample = function () {
        return {
            technician_key: "LONG-Long-key-Example",
            target_domain: "domain.without_http.com",
            request_id: "123456"
        }
    };
    mecmapi.prototype.xhrRequestAsync = function (url, options) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(options.method, url, true);
            for (headerName in options.headers) {
                xhr.setRequestHeader(headerName, options.headers[headerName]);
            }
            xhr.onload = (e) => {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            };
            xhr.onerror = (e) => {
                reject(xhr);
            };
            xhr.send(options.body);
        });
    };
    mecmapi.prototype.httpRequestAsync = async function (url, options) {
        // console.warn("HTTP OPTIONS: ", options);
        return await this.xhrRequestAsync(url, options);
    };
    mecmapi.prototype.test = function (reqid, conf) {
        console.log("MENECMAPI: TESTING");
        console.log("CONFIG: ", this.config);
        //make a request to get ticket contents
        //check response, display OK,NOT OK accordingly 
        //log response

    };
    mecmapi.prototype.getRequest = async function (requestId) {
        const _this = this;
        const url = `${_this.config.url.request}${requestId}`
        const response = await this.httpRequestAsync(url, _this.config.httpRequest);
        return JSON.parse(response.response); // parses JSON response into native JavaScript objects
    };
    mecmapi.prototype.updateRequest = async function (requestId, request) {
        const _this = this;
        // console.log("THIS IN SET: ", this);
        const inputData = { "request": request };
        const body = 'input_data=' + encodeURIComponent(JSON.stringify(inputData));
        // const fbody = new FormData().set("intput_data", { request: { subject: "testing" } });//'input_data=' + encodeURIComponent(JSON.stringify(inputData));
        // const url = `${_this.config.url.request}${requestId}?${body}`;
        const url = `${_this.config.url.request}${requestId}`//?${body}`;
        const response = await this.httpRequestAsync(url, {
            ..._this.config.httpRequest,
            headers: {
                ..._this.config.httpHeaders,
                'Content-Type': "application/x-www-form-urlencoded",
                // 'Content-Type': "text/plain;charset=UTF-8"
            },
            method: "PUT",
            body: body
        });
        return JSON.parse(response.response); // parses JSON response into native JavaScript objects
    };
    mecmapi.prototype.addNote = async function (requestId, note) {
        const _this = this;
        // console.log("THIS IN SET: ", this);
        const inputData = { "note": note };
        const body = 'input_data=' + JSON.stringify(inputData);
        const url = `${_this.config.url.api}requests/${requestId}/notes`//?${body}`;
        const response = await this.httpRequestAsync(url, {
            ..._this.config.httpRequest,
            headers: {
                ..._this.config.httpHeaders,
                'Content-Type': "application/x-www-form-urlencoded"
                // 'Content-Type': "application/json"
            },
            method: "POST",
            body: body
        });
        return JSON.parse(response.response); // parses JSON response into native JavaScript objects
    }
    mecmapi.prototype.worklog = {
        add: () => null,
        get: () => null,
        update: () => null,
        remove: () => null

    };

    return mecmapi;
}));



//SOURCE: https://github.com/umdjs/umd/blob/master/templates/returnExports.js