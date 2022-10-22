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
### browser
```JS
const mecmapi = new window.mecmapi({});

const scrProcessing = async (requestId, request) => {
    const noteDescription = `В ОБРАБОТКЕ  -//-  PROCESSING  ©`;

    const res = await mecmapi.updateRequest(requestId, {
        "group": {
            "name": "IT"
        },
        "request_type": {
            "name": "Request"
        },
        "level": {
            "name": "Coordinators"
        },
        "status": {
            "name": "Processing"
        },
        "udf_fields": {
            "udf_pick_1205": await vut.getUpdatedCoordinator()
        },
        "technician": null,
        ...request
    });
    await mecmapi.addNote(requestId, {
        "mark_first_response": true,
        "add_to_linked_requests": false,
        "notify_technician": false,
        "show_to_requester": false,
        "description": noteDescription
    })
}

const rid = vut.getRequestId();
scrProcessing(rid).then(() => {
    vut.gotoRequest(rid);
});
```

```
// CHANGELOG.md
```