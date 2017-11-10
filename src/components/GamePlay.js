/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import FourBoards from "./FourBoards";
import Board from './Board';
import HttpClient from './../modules/HttpClient';
import Chat from './Chat';
import SocketChat from './../modules/SocketClient';

class GamePlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board : Board.createEmptyBoard(),
            collectAnswer: '',
        }
    }
    componentDidMount() {
        this.handleClickGameLoad();
    }

    handleClickGameLoad = () => {
        HttpClient.getGameList((gameList) => this.setState(
            {
                board: gameList[0].data,
                collectAnswer: gameList[0].collectAnswer
            }
        ))
    };

    render() {
        let style = {
            display: 'block'
        }
        return (
            <div>
                <button style={style} className="Manager-btn" onClick={this.handleClickGameLoad.bind(this)}>Online Game Load</button>
                <FourBoards board={this.state.board}/>
                <Chat></Chat>
            </div>
        )
    }
}

export default GamePlay;