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
        this.state = {
            squares : null
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
                squares: loadSqaures
            })
        }

        files.base64 = null;
        files.fileList = [];
    };

    handleClick = (row, idx) => {
        // console.log(this.state.squares);
        console.log(row, idx);
    };

    render() {
        return (
            <div>
                <ReactFileReader base64={true} fileTypes={[".txt"]} handleFiles={this.handleFiles.bind(this)}>
                    <button className='btn'>Load</button>
                </ReactFileReader>
                <Board onClick={this.handleClick} squares={this.state.squares}></Board>
            </div>
        )
    }
}

export default Game;