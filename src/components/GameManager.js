/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Board from './Board';
import ReactFileReader from 'react-file-reader';
import BASE64 from 'base-64';
import UTF8 from 'utf8';
import HttpClient from './../modules/HttpClient';
import GameList from './GameList';

class GameManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Board.createEmptyBoard(),
            collectAnswer: "",
            count: 1,
        }
    }

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
            textArray.forEach((row) => {
                loadSqaures.push(
                    row.split("")
                    .filter((value) =>  (value >= "0" && value <= "9"))
                    .map((originValue) => Board.getValue(originValue)));
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
        const data = board[row].charAt(idx);
        let temp;
        if (data === '1') {
            temp = '0';
        } else if(data === '0') {
            temp = '1';
        } else {
            return;
        }
        board[row] = board[row].substring(0, idx) + temp + board[row].substring(idx + 1, 11);
        this.setState({
            board : board
        });
    };

    handleSaveBoard = () => {
        if (this.state.collectAnswer.length < 1) return;
        HttpClient.addGame({
            board: this.state.board.join('\n'),
            collectAnswer: this.state.collectAnswer
        }, (response) => {
            this.setState({
                collectAnswer: "",
                count: this.state.count + 1,
            })
        })
    };

    render() {
        return (
            <div>
                <div className="Manager-menu">
                    <Board onClick={this.handleClickSquare.bind(this)} squares={this.state.board}></Board>
                    <ReactFileReader base64={true} fileTypes={[".txt"]} handleFiles={this.handleLoadFiles.bind(this)}>
                        <button className='Manager-btn'>Load</button>
                    </ReactFileReader>
                    <button className="Manager-btn" onClick={this.handleSaveBoard.bind(this)}>save</button>
                    <label htmlFor="collect-answers">collect answers : </label>
                    <input onChange={(e) => this.handleChangeCollectAnswer(e.target.value)} id="collect-answers" type="text" value={this.state.collectAnswer}></input>
                    <GameList count={this.state.count}></GameList>
                </div>
            </div>
        )
    }
}

export default GameManager;