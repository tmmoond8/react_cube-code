/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import FourBoards from "./FourBoards";
import Board from './Board';
import Chat from './Chat';
import SocketClient from './../modules/SocketClient';
import UserBoard from './UserBoard';


class GamePlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board : Board.createEmptyBoard(),
            collectAnswer: '',
            user: {
                id: 3955,
                name: 'Guest',
                emoji: '🔥'
            }
        }
        SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
        SocketClient.addEventOn('cubecode-game-one', (gameData) => {
            this.setState({
                board: Board.convertText2Array(gameData),
            });
        });
    };

    handleLogin = (user) => {
        this.setState({
            user: user
        });
    };

    render() {
        let style = {
            display: 'block'
        }
        return (
            <div>
                <UserBoard></UserBoard>
                <FourBoards gameMode="nomal" board={this.state.board}/>
                <Chat onLogin={this.handleLogin.bind(this)} user={this.state.user}></Chat>
            </div>
        )
    };
}

export default GamePlay;