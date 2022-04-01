var dmas_array = ['+', '-', '*', '/'];
var myStringEquation = "";
var myArrayEquation = [];
var guess_count = 0;
$("#a_" + guess_count).css("display", "block");

function generateEquation() {
    for (let i = 0; i < 7; i++) {
        if (i % 2 == 0) {
            var randomNum = Math.floor(Math.random() * 10);
            myStringEquation += randomNum;
            if (myArrayEquation[i - 1] == '/') {
                try {


                    while (!isInt(eval(myStringEquation))) {
                        myStringEquation = myStringEquation.replace(randomNum, "");
                        randomNum = Math.floor(Math.random() * 10);
                        myStringEquation += randomNum + '';

                    }
                } catch (err) {
                    console.log(err.message);
                    location.reload();

                }
            }
            myArrayEquation[i] = randomNum + '';
        } else {
            let index_random = Math.floor(Math.random() * 4);

            myStringEquation += dmas_array[index_random];
            myArrayEquation[i] = dmas_array[index_random];

        }
    }
    console.log(myStringEquation);
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
    var calcArr = ['+', '-', '/', '*', ''];
    var strBtn = '';
    for (let i = 0; i < 4; i++) {
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "col-sm-12  d-flex justify-content-center");

        document.getElementById("keyboard").children[0].appendChild(containerDiv);
        if (i == 3) {
            const boxBtn = document.createElement("button");
            boxBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
            boxBtn.setAttribute("id", "b_enter");
            boxBtn.innerText = 'Enter';
            document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(boxBtn);
        } else {
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
    }
}
createBoxes();
createCalculator();

function addNumber(boxElm) {
    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;
    for (let j = 0; j < children.length - 1; j++) {
        let box = children[j];
        if (box.innerHTML == '') {
            box.innerHTML = boxElm;
            break;
        }

    }
}

function remove() {

    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;

    for (let j = 0; j < children.length - 1; j++) {
        let box = children[j];
        if (box.innerHTML == '') {
            if (j - 1 > -1) {
                console.log('box not 6 ' + box.innerHTML);
                children[j - 1].innerHTML = '';
                break;
            }
        } else {
            if (j == 6 && box.innerHTML != '') {
                console.log('box 6 ' + box.innerHTML);
                box.innerHTML = '';
                break;
            }
        }



    }
}

function checkResult() {

    let myEqArr = [],
        orgEqArr = [];
    let myEq = '';
    let isWinCount = 0;

    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;
    for (let j = 0; j < children.length - 1; j++) {
        myEqArr[j] = children[j].innerHTML;
        myEq += children[j].innerHTML;
    }
    console.log(myEqArr);

    try {
        if (eval(myEq) == eval(myStringEquation)) {
            orgEqArr = Array.from(myArrayEquation);
            for (let i = 0; i < myEqArr.length; i++) {
                if (myEqArr[i] == orgEqArr[i]) {
                    myEqArr[i] = 'x';
                    orgEqArr[i] = 'x';
                    children[i].style.background = 'green';
                    isWinCount++;
                }
                children[i].style.color = 'white';
            }
            if (isWinCount == 7) {
                return "win";
            } else {
                for (let i = 0; i < myEqArr.length; i++) {
                    if (myEqArr[i] != 'x') {
                        if (orgEqArr.indexOf(myEqArr[i]) != -1) {
                            // console.log("index " + orgEqArr.indexOf(myEqArr[i]));
                            orgEqArr[orgEqArr.indexOf(myEqArr[i])] = 'y';
                            myEqArr[i] = 'y';
                            children[i].style.background = 'orange';
                        } else {
                            children[i].style.background = 'black';
                        }

                    }
                    children[i].style.color = 'white';
                }
                $("#a_" + guess_count).css("display", "none");
                guess_count += 1;
                $("#a_" + guess_count).css("display", "block");

                return "next";
            }
        } else {
            for (let j = 0; j < children.length - 1; j++) {
                if (children[j].innerHTML != "" && children[j].innerHTML != undefined)
                    children[j].classList.add('shake');

                window.setTimeout(function() {

                    children[j].classList.remove('shake');
                }, 500);
            }
            warningErrorEquation();

        }
    } catch (err) {
        //show error red
        // warningErrorEquation();
        console.log("error " + err.message);
    }
}

function shakeBoxes() {

}

function warningErrorEquation() {
    console.log("hi");
    // get last child of equation
    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;

    let el = children[children.length - 1].children[0];
    var original = 'black';
    el.style.color = 'red';
    window.setTimeout(function() { el.style.color = original; }, 1500);

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

var b_enter = document.getElementById("b_enter");
b_enter.onclick = function() { checkResult() };

function displayIframe() {
    $('.iframe-container').toggle();
    $('#statsIframe').contents().find('button#closeIframe').click(function() {
        $('.iframe-container').toggle();
    });
}

$("body").mousedown(function() {
    if ($('.iframe-container').css('display') == 'block') {
        $('.iframe-container').css('display', 'none');
    }

});