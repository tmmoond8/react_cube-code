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
    }

    renderSquare = (row, idx) => {
        return <Square
            boardKey={this.props.boardKey}
            onClick={this.props.onClick}
            row={row} idx={idx} value={this.state.squares[row][idx]}/>
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
    }
}

export default Board;