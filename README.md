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
        var session = await tabapi.connect('wss://tabapi.tabcontrol.com.br/ws');

        var login = await session.call("com.tabcontrol.api.access.login", {});
    }
    catch(e){
        console.log(`exception: ${JSON.stringify(e,null,4)}`);
    }
}

main();
```

More complete example.

```
import * as tabapi from 'tabapi-client';

function onEventMessage(event: any) {
    // Just received a notification about the new event
    console.log('event:', event);
}

async function main() {

    try {
        // Connect to tabapi
        // Ensure you enabled tabapi in User Preferences
        var connection = await tabapi.connect('wss://tabapi.tabcontrol.com.br/ws');

        // Login API
        var login = await connection.call('com.tabcontrol.api.access.login', {apiId: 'APIID', apiKey: 'APIKEY'});
        console.log(`Hello ${login.token} !`);

        // Init Session
        var session = await connection.call('com.tabcontrol.api.chat.initSession', {token: login.token});
        
        // Subscribe to name changes
        var subscription = await connection.subscribe(`com.tabcontrol.api.chat.session_event_${session.sessionKey}`, onEventMessage, {});
        
        await new Promise(r => setTimeout(r, 2000));

        // Start New Chat Request 
        var chat = await connection.call('com.tabcontrol.api.chat.startRequest', {token: login.token, 
                                session: session.sessionKey, botId: 'BOTID', queueId: 'QUEUEID', contact:{id:'userid', name: 'username'}});

        await new Promise(r => setTimeout(r, 2000));
        
        // Send message
        var chat = await connection.call('com.tabcontrol.api.chat.sendMessage', {token: login.token, 
                                session: session.sessionKey, message: {text: 'TEXTO'}});
                                
        await new Promise(r => setTimeout(r, 2000));
        // Stop chat
        var chat = await connection.call('com.tabcontrol.api.chat.stopRequest', {token: login.token,  session: session.sessionKey});
                                
        await new Promise(r => setTimeout(r, 2000));
        
        // Disconnect everything
        await connection.unsubscribe(subscription);
        await connection.disconnect();
    }
    catch (e) {
        console.log(e);
    }

    process.exit();
}

main();
