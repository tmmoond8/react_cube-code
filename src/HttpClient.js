/**
 * Created by moonti on 2017. 11. 4..
 */
import axios from 'axios';

var instance = axios.create({
    baseURL: 'http://localhost:8888/cubecode/',
    timeout: 1000,
});

export default instance;