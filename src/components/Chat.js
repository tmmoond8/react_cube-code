/**
 * Created by moonti on 2017. 11. 09..
 */
import React, {Component} from 'react';
import ChatMessageItem from './ChatMessageItem';
import ChatMessageInput from './ChatMessageInput';
import SocketClient, {Message} from './../modules/SocketClient';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            user: props.user
        };

        SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
        SocketClient.sendMessage('join', {
            userId: Message.createMessageId(),
            chattingRoom: 'cubecode'
        });
        SocketClient.addEventOn('join', (user) => {
            this.props.onLogin(user);
        });
        SocketClient.addEventOn('message', (msg) => {
            let messages = Array.prototype.slice.call(this.state.messages);
            messages.push(msg);
            this.setState({
                messages: messages
            })
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.state.user) {
            this.setState({
                user: nextProps.user
            })
        }
    };

    componentDidMount() {
    }

    handleSendMessage = (msg) => {
        const message = new Message(this.state.user, msg);
        SocketClient.sendMessage('message', message);
    };

    render() {
        return (
            <div className="Common-Block">
                <ul className="Chat-Message-List">
                    {this.state.messages.map((msg) => {
                        return (
                            <ChatMessageItem user={msg.user} message={msg.message}/>
                        )
                    })}
                </ul>
                <ChatMessageInput
                    onSendMessage={this.handleSendMessage.bind(this)}
                />
            </div>
        )
    };
}

export default Chat;