/**
 * Created by tmmoon on 17. 11. 9.
 */
import React, {Component} from 'react';
import {MESSAGE_TYPE} from './../modules/SocketClient';
import PropTypes from 'prop-types';

class ChatMessageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           message: props.message
        }
        this.createMessage(props.message);
    }

    createMessage(msg) {
        const type = msg.type;
        if (type === MESSAGE_TYPE.BROADCAST) {
            this.message = this.broadcast;
        } else if (type === MESSAGE_TYPE.NOTIFY) {
            this.message = this.notify;
        }
    }

    broadcast(msg) {
        return (
            <div>
                <span className="Chat-UserName">
                    {msg.user.emoji} {msg.user.name}
                </span>
                <span>{msg.message}</span>
            </div>
        )
    }

    notify(msg) {
        return (
            <div>
                <span>{msg.message}</span>
            </div>
        )
    }

    render() {
        return (
            <li className="Chat-Message-Item">
                {this.message(this.props.message)}
            </li>
        )
    };
}

ChatMessageItem.propTypes = {
    message: PropTypes.object.isRequired
}

export default ChatMessageItem;