import data from '../ouput.json';
import * as FileSystem from 'expo-file-system';

const getRandomArray = (upperBound, length) => {
    var arr = [];
    while (arr.length < length) {
        var r = Math.floor(Math.random() * upperBound);
        if (arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }
    return arr;
}

const getData = (noOfQuestion) => {
    var arr = getRandomArray(data.length, noOfQuestion);
    var arrQuestion = [];

    for (let i = 0; i < arr.length; i++) {
        var jsonData = data[arr[i]];
        var keyRandom = getRandomArray(3, 3);
        jsonData["key_human"] = keyRandom[0];
        jsonData["key_neural"] = keyRandom[1];
        jsonData["key_stat"] = keyRandom[2];
        arrQuestion.push(jsonData);
    }
    return arrQuestion;
}

export default getData