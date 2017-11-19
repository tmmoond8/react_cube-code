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

    // 기존에 보드 데이터가 스트링을 boolean 배열로 변경해서 사용했었는데 그냥 스트링으로 처리할 수 있도록 변경
    // static convertText2Array = (text) => {
    //     if (!text) return Board.createEmptyBoard();
    //     const textArray = text.split("\n");
    //     let loadSqaures = [];
    //     textArray.map(function(row) {
    //         loadSqaures.push(
    //             row.split("")
    //                 .filter((value) =>  (value >= "0" && value <= "9"))
    //                 .map((originValue) => Board.getValue(originValue)));
    //     });
    //     return loadSqaures;
    // };

    // static convertArray2Text = (array) => {
    //     let board = array.map((row) => {
    //         return row.map((value) => {
    //             if(value === true) {
    //                 return "1"
    //             } else {
    //                 return "0"
    //             }
    //         }).join("");
    //     }).join("\n");
    //     return board;
    // };

    // static getValue = (originValue) => {
    //     return originValue === "0" || originValue === false ? false : true;
    // };

    static createEmptyBoard = () => {
        let squares = [];
        for (let i = 0; i < 11; i++) {
            squares.push("00000000000");
        }
        return squares;
    };

    renderSquare = (data, rowIdx, columnIdx) => {
        return (
            <Square
                boardColor={this.props.boardColor}
                onClick={this.props.onClick}
                row={rowIdx} idx={columnIdx} value={data}/>
        )
    };

    renderRow = (row, rowIdx) => {
        return (
            <div className="Board-board-row">
                {row.split('').map((data, idx) => this.renderSquare(data, rowIdx, idx))}
            </div>
        )
    };

    renderBoard = () => {
        return (
            <div>
                {this.state.squares.map((row, rowIdx) => this.renderRow(row, rowIdx))}
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