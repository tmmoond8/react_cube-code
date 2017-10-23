/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Square from './Square';



class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares : [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 0],
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 0],
                [1, 2, 3, 4, 5],
            ]
        }
    }

    renderSquare = (idx) => {
        return <Square idx={idx}/>
    };

    renderRow = (row) => {
        return (
            <div>
                {this.state.squares[row].map((data) => this.renderSquare(data))}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
            </div>
        )
    }
}

export default Board;