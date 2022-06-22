# MECMAPI
![npm](https://img.shields.io/npm/v/mecmapi?label=npm%40latest&logo=MECMAPI)  
Manage Engine ECMA Script (node.js) [UMD](https://github.com/umdjs/umd) module/Library/Framework to work with REST API of ServiceDesk Plus




---

## INSTALL/IMPORT
#### CDN
![npm](https://img.shields.io/npm/v/mecmapi?label=MECMAPI%40latest&logo=MECMAPI)  
Change version as needed in URL bellow:
```
https://cdn.jsdelivr.net/npm/mecmapi@0.1.1/mecmapi.js
```
#### NPM
[https://www.npmjs.com/package/mecmapi](https://www.npmjs.com/package/mecmapi)  
```
npm install mecmapi --save
```
## USAGE EXAMPLE
```JS
const mecmapi = require("mecmapi");
const de = require("dotenv");
de.config();

const dconf = {
    technician_key: process.env.TECHNICIAN_KEY,
    target_domain: "https://" + process.env.ME_DOMAIN
}

mecmapi.request.viewRequest({ ...dconf, request_id: 293141 })
    .then(res => console.log("RESPONSE: ", res));

```
