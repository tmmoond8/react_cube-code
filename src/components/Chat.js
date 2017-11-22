/**
 * Created by moonti on 2017. 11. 09..
 */
import React, {Component} from 'react';
import ChatMessageItem from './ChatMessageItem';
import ChatMessageInput from './ChatMessageInput';
import SocketClient, {Message} from './../modules/SocketClient';
import PropTypes from 'prop-types';

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
            });
        });
        SocketClient.addEventOn('notify', (msg) => {
            let messages = Array.prototype.slice.call(this.state.messages);
            messages.push(msg);
            this.setState({
                messages: messages
            });
        });
        SocketClient.addEventOn('test', (msg) => {
            const message = {
                user: {id: "12123213", name: '테스트', emoji: '👩'},
                message: msg,
                messageId: "212321313"
            }
            let messages = Array.prototype.slice.call(this.state.messages);
            messages.push(message);
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
                    {this.state.messages.map((message) => {
                        return (
                            <ChatMessageItem key={message.messageId} message={message}/>
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

Chat.propTypes = {
    user: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
}
export default Chat;