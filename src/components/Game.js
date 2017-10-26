/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Board from './Board';
import ReactFileReader from 'react-file-reader';
import BASE64 from 'base-64';
import UTF8 from 'utf8';

class Game extends Component {
    constructor(props) {
        super(props);
        let squares = [];
        for (let i = 0; i < 11; i++) {
            squares.push("00000000000".split(""));
        }
        this.state = {
            squares: squares
        }
    }

    handleFiles = (files) => {

        let base64Data = files.base64;
        if (base64Data) {
            let bytes = BASE64.decode(base64Data.split(',')[1]);
            let text = UTF8.decode(bytes);
            let textArray = text.split("\n");
            let loadSqaures = [];
            textArray.map(function(row) {
                loadSqaures.push(row.split(""));
            });
            this.setState({
                squares: loadSqaures,
            });
        }

        files.base64 = null;
        files.fileList = [];
    };

    render() {
        return (
            <div>
                <ReactFileReader base64={true} fileTypes={[".txt"]} handleFiles={this.handleFiles}>
                    <button className='btn'>Load</button>
                </ReactFileReader>
                <Board squares={this.state.squares}></Board>
            </div>
        )
    }
}

export default Game;