/**
 * Created by tmmoon on 17. 11. 9.
 */
import React, {Component} from 'react';

class ChatMessageItem extends Component {
    render() {
        return (
            <li className="Chat-Message-List">
                <span className="Chat-UserName">userName</span>
                <span>message</span>
            </li>
        )
    }
}

export default ChatMessageItem;