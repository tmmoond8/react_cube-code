/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Square from './Square';

class Board extends Component {
    constructor(props) {
        super(props);
        let squares = [];
        if (!props.squares) {
            for (let i = 0; i < 11; i++) {
                squares.push("00000000000".split(""));
            }
        } else {
            squares = props.squares;
        }

        this.state = {
            squares: squares
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.squares !== this.state.squares) {
            this.setState({ squares: nextProps.squares });
        }
    }

    renderSquare = (row, idx) => {
        return <Square
            onClick={this.props.onClick}
            row={row} idx={idx} value={this.state.squares[row][idx]}/>
    };

    renderRow = (row) => {
        return (
            <div className="board-row">
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
        this.props.onClick();
        return (
            <div>
                {this.renderBoard()}
            </div>
        )
    }
}

export default Board;