/**
 * Created by moonti on 2017. 11. 09..
 */
import React, {Component} from 'react';
import ChatMessageItem from './ChatMessageItem';

class Chat extends Component {
    render() {
        return (
            <div className="Common-Block">
                <ul className="Chat-Message-List">
                    <ChatMessageItem/>
                    <ChatMessageItem/>
                </ul>
            </div>
        )
    }
}

export default Chat;