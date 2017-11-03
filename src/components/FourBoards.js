/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import Board from './Board';

class FourBoards extends Component {
    render() {
        return (
            <div>
                <Board boardKey="FireBrick " squares={this.props.boards[0]} onClick={() => null}></Board>
                <Board boardKey="Yellow" squares={this.props.boards[1]} onClick={() => null}></Board>
                <Board boardKey="YellowGreen" squares={this.props.boards[2]} onClick={() => null}></Board>
                <Board boardKey="DarkTurquoise" squares={this.props.boards[3]} onClick={() => null}></Board>
            </div>
        )
    };
}
export default FourBoards;