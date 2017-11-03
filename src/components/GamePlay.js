/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import FourBoards from "./FourBoards";
import Board from './Board';

class GamePlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board : Board.createEmptyBoard()
        }
        this.readFiles();
    }

    readFiles = () => {
        // fs.readFile('../../public/cubeCodes/a.txt', null, (err, data) => {
        //     if (err) {
        //         return console.log(err);
        //     } else {
        //         console.log(data);
        //     }
        // });
        // const data = fs.r('../../public/cubeCodes/a.txt');
    }

    render() {
        return (
            <FourBoards board={this.state.board}/>
        )
    }
}

export default GamePlay;