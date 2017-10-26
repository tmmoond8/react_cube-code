/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Square from './Square';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            squares : this.props.squares
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.squares !== this.state.squares) {
            this.setState({ squares: nextProps.squares });
        }
    }

    renderSquare = (idx) => {
        return <Square isMark={idx === '1' ? true : false}/>
    };

    renderRow = (row) => {
        return (
            <div className="board-row">
                {this.state.squares[row].map((data) => this.renderSquare(data))}
            </div>
        )
    };

    renderBoard = () => {
        return (
            <div>
                {this.state.squares.map((data, idx) => this.renderRow(idx))}
            </div>
        )
    };

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        )
    }
}

export default Board;