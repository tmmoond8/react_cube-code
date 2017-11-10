/**
 * Created by tmmoon on 17. 11. 9.
 */
import React, {Component} from 'react';
import SocketChat from './../modules/SocketClient'

class ChatMessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleKeyPress = (key) => {
        if (key === 'Enter') {
            SocketChat.sendMessage('message', this.state.message);
            this.setState({
                message: ''
            })
        }
    }

    handleChangeMessageInput = (msg) => {
        this.setState({
            message: msg
        })
    }

    render() {
        return (
             <input type="text" className="Chat-Message-Input" placeholder="Type here..." 
             value={this.state.message} ref={ref => this.input = ref}
             onChange={e => this.handleChangeMessageInput(e.target.value)}
             onKeyPress={e => this.handleKeyPress.bind(this)(e.key)}
             />
        )
    }
}

export default ChatMessageInput;