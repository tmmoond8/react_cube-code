/**
 * Created by moonti on 2017. 11. 5..
 */
import React, {Component} from 'react';
import Board from './Board';
import HttpClient from './../HttpClient';

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardList: [],
            count: props.count,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.count !== this.state.count) {
            HttpClient.getGameList((gameList) => this.setState({boardList: gameList, count: nextProps.count}));
        }
    }

    componentDidMount() {
        HttpClient.getGameList((gameList) => this.setState({boardList: gameList}));
    }

    render() {
        return (
            <div className="Manager-menu">
                <Board boardKey="gameList" squares={Board.createEmptyBoard()} onClick={()=> null}></Board>
                <ul className="List-list">
                    {this.state.boardList.map((board, index) => {
                        return (
                            <li>{board.collectAnswer}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default GameList;