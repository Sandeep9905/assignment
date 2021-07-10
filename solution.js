
//simple Jquery to handle GUI

$(document).ready(function () {
    $("#go").click(function () {
        let value = $('#anagram').val();
        let rawData = generateAnagram(value);
        //filtering anagram letter above 2 words
        let filterjumbledata = rawData.filter(data => data.length > 2);
        console.log(filterjumbledata)
        //search for english words 
        let result = searchEnglishWord(filterjumbledata);
        // console.log(result)
        $("#result").html(filterjumbledata.map(res => `<p class="result">${res}</p>`))
        $("#meaningfulresult").html(result.map(res => `<p class="result">${res}</p>`))
    });

    $("#cube_button").click(function () {
        let value = $('#cube_input').val();
        let result = countSquares(+value);
        $("#cuberesultbox").html(`<p class="result">Total numbers of cube are ${result}</p>`)
    });
});


//==============================PROBLEM 1 ===========================

//function to make all permutataions of words from a given string
function generateAnagram(inputData, n = null, anagram = "", anagramsList = []) {
    if (anagram) {
        anagramsList.push(anagram);
    }
    if (!inputData) {
        return;
    }
    //iterate through each letter
    for (let i = 0; i < inputData.length; i++) {
        anagram += inputData[i];
        generateAnagram(inputData.slice(0, i) + inputData.slice(i + 1), n, anagram, anagramsList);
        anagram = anagram.slice(0, anagram.length - 1);
    }
    let uniquedata = [...new Set(anagramsList)];
    let hash = {};
    for (let i = 0; i < uniquedata.length; i++) {
        anagram = uniquedata[i];
        let len = anagram.length;
        if (!(len in hash)) {
            hash[len] = [anagram];
        } else {
            hash[len].push(anagram)
        }
    }
    return n === null ? uniquedata : hash[n];
}

//function to search for the english word 
function searchEnglishWord(jumbledata) {
    let resultData = [];
    jumbledata.map(anagramData => {
        let firstletter = anagramData[0].toLowerCase();
        dictionaryData[firstletter].map(res => {
            if (res.toLowerCase() == anagramData.toLowerCase()) {
                resultData.push(res)
            }
        })
    })
    return resultData;
}

//==============================PROBLEM 3 ===========================
const data = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: [{ x: 4 }, { x: 5 }, { x: 6 }, { x: 5 }, { x: [{ x: 7 }, { x: [{ x: 8 }] }] }] }, { x: 9 }];
const anotherdata = [{ x: 1 }, { x: 10 }, { x: [{ x: 30 }] }]
let sum = 0;
function nestedArraySum(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i].x)) {
            nestedArraySum(arr[i].x);
        } else {
            sum += arr[i].x;
        }
    }
    return sum;
}


console.log('Result of nested Array Sum :', nestedArraySum(anotherdata));

//==============================PROBLEM 2 ===========================
function countSquares(no_of_base_square) {
    if (no_of_base_square == 0) {
        return 0;
    }
    if (no_of_base_square == 1) {
        return 1;
    }
    return no_of_base_square * no_of_base_square + 1;

}
