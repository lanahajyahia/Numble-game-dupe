// import { generateEquation } from './module.js';
var dmas_array = ['+', '-', '*', '/'];
// console.log(Math.floor(Math.random() * 4));

var myStringEquation = "";
var myArrayEquation = [];

function generateEquation() {
    for (let i = 0; i < 7; i++) {
        if (i % 2 == 0) {
            var randomNum = Math.floor(Math.random() * 10);
            myStringEquation += randomNum;
            console.log("before 1 " + eval(myStringEquation));
            //  myArrayEquation[i] = randomNum;
            if (myArrayEquation[i - 1] == '/') {
                while (!isInt(eval(myStringEquation))) {
                    myStringEquation = myStringEquation.replace(randomNum, "");
                    randomNum = Math.floor(Math.random() * 10);
                    myStringEquation += randomNum;

                }
            }
            myArrayEquation[i] = randomNum;
        } else {
            let index_random = Math.floor(Math.random() * 4);

            myStringEquation += dmas_array[index_random];
            myArrayEquation[i] = dmas_array[index_random];

        }
    }
    return eval(myStringEquation);
}

function isInt(n) {
    return n % 1 === 0;
}

function createBoxes() {
    var randNum = generateEquation();
    for (let i = 0; i < 6; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row mt-2");

        document.getElementsByClassName("boxes")[0].appendChild(rowDiv);
        for (let j = 0; j < 7; j++) {

            const boxBtn = document.createElement("button");
            boxBtn.setAttribute("class", "box btn btn-outline-secondary");
            document.getElementsByClassName("row")[i].appendChild(boxBtn);


        }
        const resultDiv = document.createElement("div");
        resultDiv.setAttribute("id", "a_" + i);

        document.getElementsByClassName("row")[i].appendChild(resultDiv);

        for (let j = 0; j < 2; j++) {

            const resultBoxBtn = document.createElement("button");
            resultBoxBtn.setAttribute("class", "box btn");
            if (j == 0) {
                resultBoxBtn.innerText = "=";
            } else {
                resultBoxBtn.innerText = randNum;
            }
            document.getElementById(resultDiv.getAttribute('id')).appendChild(resultBoxBtn);
        }
    }
}

function createCalculator() {
    var count = 1;
    var calcStrArr = ['plus', 'minus', 'div', 'multiple', 'delete'];
    var calcArr = ['+', '-', '/', '*', 'x'];
    var strBtn;
    for (let i = 0; i < 4; i++) {
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "col-sm-12  d-flex justify-content-center");
        document.getElementById("keyboard").children[0].appendChild(containerDiv);
        if (i == 3) {
            const boxBtn = document.createElement("button");
            boxBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");

            document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(boxBtn);
        }
        // var innerDiv = document.createElement("div");
        // document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(innerDiv);

        for (let j = 0; j < 5; j++) {
            const boxBtn = document.createElement("button");
            boxBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
            strBtn = count;
            if (count == 10) {
                count = 0;
                strBtn = 0;
                boxBtn.setAttribute("id", "b_" + strBtn);

            } else if (count == 0) {
                boxBtn.setAttribute("id", "b_" + calcStrArr[j]);
                strBtn = calcArr[j];

            } else {
                boxBtn.setAttribute("id", "b_" + count++);
            }
            boxBtn.innerText = strBtn;
            document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(boxBtn);
        }
    }
    // create enter button

}
createBoxes();
createCalculator();

function addNumber(boxElm) {
    for (let j = 0; j < 7; j++) {
        var box = document.getElementsByClassName('box')[j];
        // console.log('box elm ' + boxElm);
        // console.log('box elm ' + box.innerHTML);
        if (box.innerHTML == null || box.innerHTML == undefined || box.innerHTML.trim() == '') {
            box.innerHTML = boxElm;
            break;
        }

    }
}

function remove() {
    for (let j = 0; j < 7; j++) {
        var box = document.getElementsByClassName('box')[j];
        // console.log('box elm ' + boxElm);

        if (box.innerHTML == null || box.innerHTML == undefined || box.innerHTML.trim() == '') {
            if (j - 1 > -1) {
                console.log('box not 6 ' + box.innerHTML);
                document.getElementsByClassName('box')[j - 1].innerHTML = '';
                break;
            }

        } else {
            if (j == 6 && box.innerHTML != undefined) {
                console.log('box 6 ' + box.innerHTML);
                box.innerHTML = '';
                break;
            }
        }

    }
}

var b1 = document.getElementById("b_1");
b1.onclick = function() { addNumber(b1.innerHTML) };

var b2 = document.getElementById("b_2");
b2.onclick = function() { addNumber(b2.innerHTML) };

var b3 = document.getElementById("b_3");
b3.onclick = function() { addNumber(b3.innerHTML) };

var b4 = document.getElementById("b_4");;
b4.onclick = function() { addNumber(b4.innerHTML) };

var b5 = document.getElementById("b_5");
b5.onclick = function() { addNumber(b5.innerHTML) };

var b6 = document.getElementById("b_6");
b6.onclick = function() { addNumber(b6.innerHTML) };

var b7 = document.getElementById("b_7");
b7.onclick = function() { addNumber(b7.innerHTML) };

var b8 = document.getElementById("b_8");
b8.onclick = function() { addNumber(b8.innerHTML) };

var b9 = document.getElementById("b_9");
b9.onclick = function() { addNumber(b9.innerHTML) };

var b0 = document.getElementById("b_0");
b0.onclick = function() { addNumber(b0.innerHTML) };

var b_plus = document.getElementById("b_plus");
b_plus.onclick = function() { addNumber(b_plus.innerHTML) };

var b_minus = document.getElementById("b_minus");
b_minus.onclick = function() { addNumber(b_minus.innerHTML) };

var b_multiple = document.getElementById("b_multiple");
b_multiple.onclick = function() { addNumber(b_multiple.innerHTML) };

var b_divide = document.getElementById("b_div");
b_divide.onclick = function() { addNumber(b_divide.innerHTML) };

var b_delete = document.getElementById("b_delete");
b_delete.onclick = function() { remove() };

// elm.onclick = function() { console.log("hi") };


// elm.onclick = function() { console.log("hi") };
// var mainDiv = document.getElementById('a_0');
// var secondBtn = mainDiv.children[1];

// var randomNum = Math.floor(Math.random() * 10);
// secondBtn.textContent = randomNum;
// console.log("ready!");