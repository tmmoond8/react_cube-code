/**
 * Created by moonti on 2017. 11. 4..
 */
import io from 'socket.io-client';

let socket = io('http://localhost:8888');
console.log('socket io client');

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
    constructor(userName, message) {
        this.userName = userName || 'Unknwon';
        this.message = message || '';
    }
}

export default SocketChat;
export {Message};