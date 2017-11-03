/**
 * Created by moonti on 2017. 10. 29..
 */
import React, {Component} from 'react';
import FourBoards from "./FourBoards";
import fs from 'fs';

class GamePlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards : [this.createEmptyBoard(), this.createEmptyBoard(),
            this.createEmptyBoard(), this.createEmptyBoard()]
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
        const data = fs.r('../../public/cubeCodes/a.txt');
    }

    createEmptyBoard = () => {
        let squares = [];
        for (let i = 0; i < 11; i++) {
            squares.push("01010101010".split("").map((originValue) => this.getValue(originValue)));
        }
        return squares;
    };

    getValue = (originValue) => {
        return originValue === "0" || originValue === false ? false : true;
    };

    render() {
        return (
            <FourBoards boards={this.state.boards}/>
        )
    }
}

export default GamePlay;