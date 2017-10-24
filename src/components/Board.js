/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Square from './Square';



class Board extends Component {
    constructor(props) {
        super(props);

        FileReader

        this.state = {
            squares : [
                "11111111111".split(""),
                "10000000001".split(""),
                "10000000001".split(""),
                [6, 7, 8, 9, 0],
                [1, 2, 3, 4, 5],
            ]
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