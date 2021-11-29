import * as autobahn from 'autobahn';
export declare class Session {
    session: autobahn.Session;
    connection: autobahn.Connection;
    constructor(session: autobahn.Session, connection: autobahn.Connection);
    call(uri: string, args: any, options?: any): Promise<any>;
    subscribe(topic: string, subscribeHandler: autobahn.SubscribeHandler, options: any): Promise<autobahn.ISubscription>;
    unsubscribe(subscription: autobahn.ISubscription): Promise<any>;
    disconnect(): Promise<unknown>;
}
export declare function connect(host: string): Promise<Session>;
