# TABControl API Client

To use tabapi client in a Node.js project:

`npm install tabapi-client --save`

tabapi-client also comes with TypeScript definitions.

## Example

This example is a Node.js TypeScript example using ES2015 js target.

```
import * as tabapi from 'tabapi-client';

async function main() {
    try {
        var session = await tabapi.connect('ws://localhost:8080/ws');

        var login = await session.call("com.tabcontrol.api.chat.login", {});
    }
    catch(e){
        console.log(`exception: ${JSON.stringify(e,null,4)}`);
    }
}

main();
```

Refer to [hello-tabapi on GitHub](https://github.com/tabcontrol/tabapi-hello-async/blob/master/index.ts) for a more complete example.
