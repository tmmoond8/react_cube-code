/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import FourBoards from "./FourBoards";
import Board from './Board';
import Chat from './Chat';
import SocketClient from './../modules/SocketClient'

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
        SocketClient.addEventOn('cubecode-game-one', (gameData) => {
            this.setState({
                board: Board.convertText2Array(gameData.data),
                collectAnswer: gameData.collectAnswer
            });
        });
    };

    handleLogin = (user) => {
        this.setState({
            user: user
        });
    };

    componentDidMount() {
    };

    handleClickGameLoad = () => {
    };

    render() {
        let style = {
            display: 'block'
        }
        return (
            <div>
                <button style={style} className="Manager-btn" onClick={this.handleClickGameLoad.bind(this)}>Online Game Load</button>
                <FourBoards board={this.state.board}/>
                <Chat onLogin={this.handleLogin.bind(this)} user={this.state.user}></Chat>
            </div>
        )
    };
}

export default GamePlay;