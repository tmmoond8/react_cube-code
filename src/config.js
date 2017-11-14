/**
 * Created by moonti on 2017. 11. 14..
 */
let Config = {};
let socketClient = {
    host: 'http://localhost',
    port: 8888,
};
socketClient.baseURL = socketClient.host + ':' + socketClient.port;
let httpClient = {
    host: 'http://localhost',
    port: 8888,
}
httpClient.baseURL = httpClient.host + ':' + httpClient.port + '/cubecode/';
Config.socketClient = socketClient;
Config.httpClient = httpClient;

export default Config;