/**
 * Created by moonti on 2017. 11. 15..
 */

import React, {Component} from 'react';
import SocketClient from './../modules/SocketClient';

class UserBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: {}
        }

        SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
        SocketClient.addEventOn('userList', (userList) => {
            this.setState({
                userList: userList
            })
        })
    }
    render() {
        const style = {
            display : 'block'
        }
        return (
            <div style={style}>ddsdsds
                <ul>
                    {Object.keys(this.state.userList)
                        .map((key) => this.state.userList[key])
                        .map((user) => {
                            return (
                                <li>{user.emoji} {user.name} {user.score}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default UserBoard;

