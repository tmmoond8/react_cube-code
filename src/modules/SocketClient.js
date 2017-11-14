/**
 * Created by moonti on 2017. 11. 4..
 */
import io from 'socket.io-client';
import Config from './../config';

let socket = io(Config.socketClient.baseURL);
socket.on('connect', () => {
    console.log('socket connect');
});
socket.on('disconnect', () => {
    console.log('socket disconnect');
});

let SocketChat = {
    sendMessage: (event, message) => {
        socket.emit(event, message);
    },
    addEventOn: (event, fn) => {
        socket.on(event, (msg) => {
            fn(msg);
        })
    },
}

class Message {
    constructor(user, message) {
        this.user = user;
        this.message = message || '';
        this.messageId = Message.createMessageId();
    }

    static createMessageId = () => {
        const toDay = new Date().toISOString().slice(0,10).replace(/-/g,"")
        return toDay + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}
export default SocketChat;
export {Message};