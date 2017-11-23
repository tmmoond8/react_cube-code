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
            boards : [
                Board.createEmptyBoard(), Board.createEmptyBoard(),
                Board.createEmptyBoard(), Board.createEmptyBoard()
                ],
            collectAnswer: '',
            user: {
                id: 3955,
                name: 'Guest',
                emoji: '🔥'
            },
            collectBoard: Board.createEmptyBoard(),
        }
        SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
        SocketClient.addEventOn('cubecode-game-one', (gameData) => {
            this.setState({
                boards: gameData,
                collectBoard: this.collectBoard(gameData),
            });
        });
    };

    collectBoard = (gameData) => {
        let board = Board.createEmptyBoard();
        board = board.map((row) => row.split(''));
        let checkData = [];
        gameData.forEach((board) => {
            board.forEach((row, rowIdx) => {
                // console.log(row);
                row.split('').forEach((value, columnIdx) => {
                    if (value !== '0') {
                        checkData.push({
                            value: value,
                            rowIdx: rowIdx,
                            columnIdx: columnIdx
                        })
                    }
                })
            })
        })
        while(checkData.length > 0) {
            const checkItem = checkData.pop();
            board[checkItem.rowIdx][checkItem.columnIdx] = checkItem.value;
        }
        return board.map((rowArray) => rowArray.join(''));
    }

    handleLogin = (user) => {
        this.setState({
            user: user
        });
    };

    render() {
        return (
            <div>
                <UserBoard></UserBoard>
                <FourBoards boards={this.state.boards}/>
                <Board squares={this.state.collectBoard}/>
                <Chat onLogin={this.handleLogin.bind(this)} user={this.state.user}></Chat>
            </div>
        )
    };
}

export default GamePlay;