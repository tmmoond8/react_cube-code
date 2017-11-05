/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import FourBoards from "./FourBoards";
import Board from './Board';
import HttpClient from './../HttpClient';

class GamePlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board : Board.createEmptyBoard()
        }
    }

    componentDidMount() {
        this.handleClickGameLoad();
    }

    handleClickGameLoad = () => {
        let that = this;
        HttpClient.get('game/list')
            .then(function (result) {
                let gameBoard = Board.convertText2Array(result.data[0].data);
                that.setState({
                    board: gameBoard
                })
            })
            .catch(function (error) {
                console.log('failed' + error);
            })
    };

    render() {
        return (
            <div>
                <button className="Game-menu-btn" onClick={this.handleClickGameLoad.bind(this)}>Online Game Load</button>
                <FourBoards board={this.state.board}/>
            </div>
        )
    }
}

export default GamePlay;