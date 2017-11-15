/**
 * Created by tmmoon on 17. 11. 9.
 */
import React, {Component} from 'react';

class ChatMessageItem extends Component {
    render() {
        return (
            <li className="Chat-Message-Item">
                <span className="Chat-UserName">
                    {this.props.user.emoji} {this.props.user.name}
                </span>
                <span>{this.props.message}</span>
            </li>
        )
    };
}

export default ChatMessageItem;