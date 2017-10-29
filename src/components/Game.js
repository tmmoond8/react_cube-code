/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Board from './Board';
import ReactFileReader from 'react-file-reader';
import BASE64 from 'base-64';
import UTF8 from 'utf8';
import fileSaver from 'file-saver';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: this.createEmptySquares(),
            collectAnswer: "",
        }
    }

    createEmptySquares = () => {
        let squares = [];
        for (let i = 0; i < 11; i++) {
            squares.push("00000000000".split("").map((originValue) => this.getValue(originValue)));
        }
        return squares;
    };

    getValue = (originValue) => {
        return originValue === "0" || originValue === false ? false : true;
    };

    handleChangeCollectAnswer = (value) => {
        this.setState({
            collectAnswer: value
        });
    };

    handleLoadFiles = (files) => {
        let base64Data = files.base64;
        if (base64Data) {
            let bytes = BASE64.decode(base64Data.split(',')[1]);
            bytes = bytes.split(":");
            let collectAnswer = UTF8.decode(bytes[1]);
            let textArray = bytes[0].split("\n");
            let loadSqaures = [];
            let that = this;
            textArray.map(function(row) {
                loadSqaures.push(
                    row.split("")
                    .filter((value) =>  (value >= "0" && value <= "9"))
                    .map((originValue) => that.getValue(originValue)));
            });
            this.setState({
                squares: loadSqaures,
                collectAnswer: collectAnswer
            })
        }

        files.base64 = null;
        files.fileList = [];
    };

    handleSquareClick = (row, idx) => {
        let board = Array.prototype.slice.call(this.state.squares);
        board[row][idx] = !board[row][idx];
        this.setState({
            squares : board
        });
    };

    handleSaveBoard = () => {
        let board = this.state.squares.map((row) => {
            return row.map((value) => {
                if(value === true) {
                    return "1"
                } else {
                    return "0"
                }
            }).join("");
        }).join("\n");
        board += ":" + this.state.collectAnswer;
        let blob = new Blob([board], {type: "text/plain;charset=utf-8"});
        fileSaver.saveAs(blob, "cube-code-data.txt");
        this.setState({
            collectAnswer: ""
        })
    };

    render() {
        return (
            <div>
                <div className="Game-admin-menu">
                    <ReactFileReader base64={true} fileTypes={[".txt"]} handleFiles={this.handleLoadFiles.bind(this)}>
                        <button className='Game-menu-btn'>Load</button>
                    </ReactFileReader>
                    <button className="Game-menu-btn" onClick={this.handleSaveBoard}>save</button>
                    <label for="collect-answers">collect answers : </label>
                    <input onChange={(e) => this.handleChangeCollectAnswer(e.target.value)} id="collect-answers" type="text" value={this.state.collectAnswer}></input>
                </div>
                <Board onClick={this.handleSquareClick.bind(this)} squares={this.state.squares}></Board>
            </div>
        )
    }
}

export default Game;