/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Board from './Board';
import FourBoards from './FourBoards';
import ReactFileReader from 'react-file-reader';
import BASE64 from 'base-64';
import UTF8 from 'utf8';
import fileSaver from 'file-saver';

class GameManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.createEmptyBoard(),
            collectAnswer: "",
            quizBoards: [
                this.createEmptyBoard(), this.createEmptyBoard(),
                this.createEmptyBoard(), this.createEmptyBoard(),
            ]
        }
    }

    createEmptyBoard = () => {
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
        const base64Data = files.base64;
        if (base64Data) {
            let bytes = BASE64.decode(base64Data.split(',')[1]);
            bytes = bytes.split(":");
            const collectAnswer = UTF8.decode(bytes[1]);
            const textArray = bytes[0].split("\n");
            let loadSqaures = [];
            const that = this;
            textArray.map(function(row) {
                loadSqaures.push(
                    row.split("")
                    .filter((value) =>  (value >= "0" && value <= "9"))
                    .map((originValue) => that.getValue(originValue)));
            });
            this.setState({
                board: loadSqaures,
                collectAnswer: collectAnswer
            })
        }

        files.base64 = null;
        files.fileList = [];
    };

    handleClickSquare = (row, idx) => {
        let board = Array.prototype.slice.call(this.state.board);
        board[row][idx] = !board[row][idx];
        this.setState({
            board : board
        });
    };

    handleSaveBoard = () => {
        if (this.state.collectAnswer.length < 1) return;
        let board = this.state.board.map((row) => {
            return row.map((value) => {
                if(value === true) {
                    return "1"
                } else {
                    return "0"
                }
            }).join("");
        }).join("\n");
        board += ":" + this.state.collectAnswer;
        const blob = new Blob([board], {type: "text/plain;charset=utf-8"});
        fileSaver.saveAs(blob, "cube-code-data.txt");
        this.setState({
            collectAnswer: ""
        })
    };

    handleClickGameStart = (gameMode) => {
        const codeData = this.getBoardData();
        let quardBoards = [this.createEmptyBoard(), this.createEmptyBoard(),
            this.createEmptyBoard(), this.createEmptyBoard()
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
            quizBoards: quardBoards
        })
    };

    getBoardData = () => {
        const board = Array.prototype.slice.call(this.state.board);
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

    render() {
        const style = {
            display: 'table',
            float: 'center'
        };
        return (
            <div>
                <div className="Game-admin-menu">
                    <Board boardKey="main" onClick={this.handleClickSquare.bind(this)} squares={this.state.board}></Board>
                    <ReactFileReader base64={true} fileTypes={[".txt"]} handleFiles={this.handleLoadFiles.bind(this)}>
                        <button className='Game-menu-btn'>Load</button>
                    </ReactFileReader>
                    <button className="Game-menu-btn" onClick={this.handleSaveBoard}>save</button>
                    <label for="collect-answers">collect answers : </label>
                    <input onChange={(e) => this.handleChangeCollectAnswer(e.target.value)} id="collect-answers" type="text" value={this.state.collectAnswer}></input>
                    <div style={style}>
                        <button className="Game-menu-btn" onClick={this.handleClickGameStart.bind(this)}>Easy Game Start</button>
                        <button className="Game-menu-btn" onClick={this.handleClickGameStart.bind(this, 'nomal')}>Nomal Game Start</button>
                    </div>
                    <FourBoards boards={this.state.quizBoards}></FourBoards>
                </div>
            </div>
        )
    }
}

export default GameManager;