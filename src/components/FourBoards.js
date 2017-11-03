/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import Board from './Board';

class FourBoards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [
                this.props.createEmptyBoard(),
                this.props.createEmptyBoard(),
                this.props.createEmptyBoard(),
                this.props.createEmptyBoard(),
            ]
        }
    }

    getBoardData = () => {
        const board = Array.prototype.slice.call(this.props.board);
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

    handleClickGameStart = (gameMode) => {
        const codeData = this.getBoardData();
        let quardBoards = [
            this.props.createEmptyBoard(),
            this.props.createEmptyBoard(),
            this.props.createEmptyBoard(),
            this.props.createEmptyBoard(),
        ];
        if (gameMode === 'nomal') {
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
        const style = {
            display: 'table',
            float: 'center'
        };
        return (
            <div>
                <div style={style}>
                    <button className="Game-menu-btn" onClick={this.handleClickGameStart.bind(this)}>Easy Game Start</button>
                    <button className="Game-menu-btn" onClick={this.handleClickGameStart.bind(this, 'nomal')}>Nomal Game Start</button>
                </div>
                <Board boardKey="FireBrick " squares={this.state.boards[0]} onClick={() => null}></Board>
                <Board boardKey="Yellow" squares={this.state.boards[1]} onClick={() => null}></Board>
                <Board boardKey="YellowGreen" squares={this.state.boards[2]} onClick={() => null}></Board>
                <Board boardKey="DarkTurquoise" squares={this.state.boards[3]} onClick={() => null}></Board>
            </div>
        )
    };
}
export default FourBoards;