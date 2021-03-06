/**
 * Created by moonti on 2017. 11. 4..
 */
import axios from 'axios';
import Config from './../config';

var instance = axios.create({
    baseURL: Config.httpClient.baseURL,
    timeout: 1000,
});

instance.getGameList = (callback) => {
    instance.get('game/list')
        .then(function (result) {
            let gameBoardArray = result.data.map((gameData) => {
                return {
                    data: gameData.data.split('\n'), collectAnswer: gameData.collectAnswer
                }
            });
            callback(gameBoardArray);
        })
        .catch(function (error) {
            console.log('failed' + error);
        });
}

instance.addGame = (gameData, callback) => {
    instance.post('game/add', {
        data: gameData.board,
        collectAnswer: gameData.collectAnswer,
    })
        .then( response => {
            typeof callback === 'function' && callback()
        })
        .catch(err => {console.dir(err)})
}

export default instance;