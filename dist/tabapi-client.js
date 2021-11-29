"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autobahn = require("autobahn");
class Session {
    constructor(session, connection) {
        this.session = session;
        this.connection = connection;
    }
    call(uri, args, options) {
        return new Promise((resolve, reject) => {
            this.session.call(uri, [args], {}, options).then(function (res) {
                resolve(res ? res.kwargs : null);
            }, function (error) {
                reject(error);
            });
        });
    }
    subscribe(topic, subscribeHandler, options) {
        return new Promise((resolve, reject) => {
            var self = this;
            this.session.subscribe(topic, subscribeHandler, options).then(function (res) {
                resolve(res);
            }, function (error) {
                reject(error);
            });
        });
    }
    unsubscribe(subscription) {
        return new Promise((resolve, reject) => {
            this.session.unsubscribe(subscription).then(function (res) {
                resolve(null);
            }, function (error) {
                reject(error);
            });
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            if (this.session.isOpen) {
                this.session.onleave = function (reason, details) {
                    resolve();
                };
                this.connection.close();
                this.connection = null;
                this.session = null;
            }
            else {
                reject();
            }
        });
    }
}
exports.Session = Session;
function connect(host) {
    return new Promise((resolve, reject) => {
        var connection = new autobahn.Connection({
            url: host,
            realm: 'tabcontrol',
            protocols: ['wamp.2.json'],
        });
        connection.onclose = function (reason, details) {
            reject(new Error(`Session closed: ${reason}`));
            return true;
        };
        connection.onopen = function (session) {
            connection.onclose = null;
            resolve(new Session(session, connection));
        };
        connection.open();
    });
}
exports.connect = connect;
//# sourceMappingURL=tabapi-client.js.map