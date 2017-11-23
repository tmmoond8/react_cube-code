/**
 * Created by moonti on 2017. 11. 5..
 */
import React, {Component} from 'react';
import Board from './Board';
import HttpClient from './../modules/HttpClient';
import GameListItem from './GameListItem';
import PropTypes from 'prop-types';

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardList: [],
            count: props.count,
            selectIndex: -1,
            selectBoard: Board.createEmptyBoard()
        }
    }

    handleClickListItem = (index) => {
        if (this.state.selectIndex === index) {
            return;
        }
        this.setState({
            selectIndex: index,
            selectBoard: this.state.boardList[index].data
        });
    };

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
                <Board squares={this.state.selectBoard} onClick={null}></Board>
                <h2>{this.state.boardList.length}</h2>
                <ul className="List-list">
                    {this.state.boardList.map((board, index) => {
                        return (
                            <GameListItem
                                key={index}
                                onClick={this.handleClickListItem.bind(this, index)}
                                selectIndex={this.state.selectIndex}
                                index={index}
                                collectAnswer={board.collectAnswer}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
}

GameList.propTypes = {
    count: PropTypes.number.isRequired
}

export default GameList;