/**
 * Created by moonti on 2017. 10. 23..
 */
import React, {Component} from 'react';
import Board from './Board';
import ReactFileReader from 'react-file-reader';

class Game extends Component {

    handleFiles = files => {
        console.log(files);
    };

    render() {
        return (
            <div>
                <ReactFileReader handleFiles={this.handleFiles}>
                    <button className='btn'>Load</button>
                </ReactFileReader>
                <Board></Board>
            </div>
        )
    }
}

export default Game;