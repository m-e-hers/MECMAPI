
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

const MECMAPI = (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('node-fetch'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (b) {
    // Use b in some fashion.
    const fetch = b;

    const dfc = (config) => {
        const techkey = config.technician_key;

        return {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "TECHNICIAN_KEY": techkey
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
    };

    const furl = (config) => {
        const url = config.target_domain + "/api/v3/requests/" + config.request_id;

        return url;
    };

    const mecmapi = {
        getConfigExample: () => {
            return {
                technician_key: "LONG-Long-key-Example",
                target_domain: "domain.without_http.com",
                request_id: "123456"
            }
        },
        test: (reqid, conf) => {
            console.log("MENECMAPI: TESTING");
            //make a request to get ticket contents
            //check response, display OK,NOT OK accordingly 
            //log response

        },
        request: {
            get: async (config) => {
                const response = await fetch(furl(config), dfc(config));
                return response.json(); // parses JSON response into native JavaScript objects
            },
            getAll: async (config) => {
                const response = await fetch(furl(config), dfc(config));
                return response.json(); // parses JSON response into native JavaScript objects
            }
        },
        worklog: {
            add: () => null,
            get: () => null,
            update: () => null,
            remove: () => null

        }
    };

    return mecmapi;
}))();



//SOURCE: https://github.com/umdjs/umd/blob/master/templates/returnExports.js