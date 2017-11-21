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
                row={rowIdx} idx={columnIdx} value={data}
                key={rowIdx*11 + columnIdx}   
            />
        )
    };

    renderRow = (row, rowIdx) => {
        return (
            <div className="Board-board-row" key={rowIdx}>
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