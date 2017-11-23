/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import Board from './Board';
import PropTypes from 'prop-types';

class FourBoards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: props.boards,
            gameMode: props.gameMode,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.boards !== this.state.boards) {
            this.setState({
                boards: nextProps.boards
            });
        };
    }

    getBoardData = (nextBoard) => {
        const board = Array.prototype.slice.call(nextBoard);
        let codeData = [];
        board.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                if (value) {
                    codeData.push({
                        row: rowIndex,
                        idx: columnIndex,
                    });
                }
            })
        });
        return codeData;
    }

    gameStart = (nextBoard) => {
        const codeData = this.getBoardData(nextBoard);
        let quardBoards = [
            Board.createEmptyBoard(),
            Board.createEmptyBoard(),
            Board.createEmptyBoard(),
            Board.createEmptyBoard(),
        ];
        if (this.state.gameMode === 'nomal') {
            let i = 0;
            while(codeData.length > 0) {
                let randomIndex = Math.floor(Math.random()*4827318 % codeData.length);
                let squareData = codeData[randomIndex];
                quardBoards[i++ % 4][squareData.row][squareData.idx] = true;
                codeData.splice(randomIndex, 1);
            }
        } else {
            codeData.forEach((squareData, index) => {
                quardBoards[index % 4][squareData.row][squareData.idx] = true;
            });
        }
        this.setState({
            boards: quardBoards
        })
    };


    render() {

        return (
            <div>
                <Board squares={this.state.boards[0]} onClick={null}></Board>
                <Board squares={this.state.boards[1]} onClick={null}></Board>
                <Board squares={this.state.boards[2]} onClick={null}></Board>
                <Board squares={this.state.boards[3]} onClick={null}></Board>
            </div>
        )
    };
}

FourBoards.propTypes = {
    gameMode: PropTypes.string,
    boards: PropTypes.array.isRequired,

}
FourBoards.defaultProps = {
    gameMode: 'normal'
}

export default FourBoards;