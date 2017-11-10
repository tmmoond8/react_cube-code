/**
 * Created by moonti on 2017. 11. 09..
 */
import React, {Component} from 'react';
import ChatMessageItem from './ChatMessageItem';
import ChatMessageInput from './ChatMessageInput';
import SocketClient from './../modules/SocketClient';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        let that = this;
        SocketClient.addEventOn('message', (msg) => {
            let messages = Array.prototype.slice.call(this.state.messages);
            messages.push(msg);
            that.setState({
                messages: messages
            })
        })
    }

    render() {
        return (
            <div className="Common-Block">
                <ul className="Chat-Message-List">
                    {this.state.messages.map((message) => {
                        return (
                            <ChatMessageItem message={message}/>
                        )
                    })}
                </ul>
                <ChatMessageInput/>
            </div>
        )
    }
}

export default Chat;