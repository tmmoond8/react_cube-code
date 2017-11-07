/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Square from './Square';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: props.squares
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.squares !== this.state.squares) {
            this.setState({ squares: nextProps.squares });
        }
    };

    static convertText2Array = (text) => {
        if (!text) return Board.createEmptyBoard();
        const textArray = text.split("\n");
        let loadSqaures = [];
        textArray.map(function(row) {
            loadSqaures.push(
                row.split("")
                    .filter((value) =>  (value >= "0" && value <= "9"))
                    .map((originValue) => Board.getValue(originValue)));
        });
        return loadSqaures;
    };

    static convertArray2Text = (array) => {
        let board = array.map((row) => {
            return row.map((value) => {
                if(value === true) {
                    return "1"
                } else {
                    return "0"
                }
            }).join("");
        }).join("\n");
        return board;
    };

    static createEmptyBoard = () => {
        let squares = [];
        for (let i = 0; i < 11; i++) {
            squares.push("00000000000".split("").map((originValue) => Board.getValue(originValue)));
        }
        return squares;
    };

    static getValue = (originValue) => {
        return originValue === "0" || originValue === false ? false : true;
    };


    renderSquare = (row, idx) => {
        return (
            <Square
                boardColor={this.props.boardColor}
                onClick={this.props.onClick}
                row={row} idx={idx} value={this.state.squares[row][idx]}/>
        )
    };

    renderRow = (row) => {
        return (
            <div className="Board-board-row">
                {this.state.squares[row].map((data, idx) => this.renderSquare(row, idx))}
            </div>
        )
    };

    renderBoard = () => {
        return (
            <div>
                {this.state.squares.map((data, row) => this.renderRow(row))}
            </div>
        )
    };

    render() {
        return (
            <div className="Board-board">
                {this.renderBoard()}
            </div>
        )
    };
}

export default Board;