var guess_count = 0;
var dmas_array = ['+', '-', '*', '/'];
var myArrayEquation = [];
var randNum;
var game_status = ""; // if win new game if next continue

var current_result_arr = current_result_arr || [];

var played = 0;
var win = 0;
var winPer = 0;

window.onload = function() {
    if (window.sessionStorage.getItem('myArrayEquation') == null || window.sessionStorage.getItem('myArrayEquation') == []) {
        myArrayEquation = generateEquation(dmas_array);
        console.log(Array.isArray(myArrayEquation));
        let tempArray = Array.from(myArrayEquation);
        console.log("bef sess" + (Array.isArray(myArrayEquation)));
        randNum = eval(tempArray.join(''));
        sessionStorage.setItem('randNum', randNum);
    } else {

        guess_count = window.sessionStorage.getItem('guess_count');
        myArrayEquation = JSON.parse(window.sessionStorage.getItem('myArrayEquation'));
        console.log("after sess" + (myArrayEquation));
        randNum = window.sessionStorage.getItem('randNum');

        console.log("randum num " + randNum);

        game_status = window.sessionStorage.getItem('game_status');
        $('#statsIframe').contents().find('#won').text(window.sessionStorage.getItem('win'));
        $('#statsIframe').contents().find('#win').text(window.sessionStorage.getItem('winPer') + '%');
        $('#statsIframe').contents().find('#played').html(window.sessionStorage.getItem('played'));
    }

    createBoxes(randNum);
    createCalculator();

    console.log("guess count ", guess_count);
    $("#a_" + guess_count).css("display", "block");
    $("body").mousedown(function() {
        if ($('.iframe-container').css('display') == 'block') {
            $('.iframe-container').css('display', 'none');
        }

    });
    $('#statsIframe').contents().find('button#closeIframe').click(function() {
        $('.iframe-container').toggle();
    });

    current_result_arr = JSON.parse(window.sessionStorage.getItem('current_result_arr'));
    if (current_result_arr != null && current_result_arr != undefined)
        if (current_result_arr.length > 0) {
            fillMatrix();
        }


    $("body").keypress(function() {
        // event.preventDefault();

        switch (event.keyCode) {
            case 57:
                addNumber(event.key);
                break;
            case 56:
                addNumber(event.key);
                break;
            case 55:
                addNumber(event.key);
                break;
            case 54:
                addNumber(event.key);
                break;
            case 53:
                addNumber(event.key);
                break;
            case 52:
                addNumber(event.key);
                break;
            case 51:
                addNumber(event.key);
                break;
            case 50:
                addNumber(event.key);
                break;
            case 49:
                addNumber(event.key);
                break;
            case 48:
                addNumber(event.key);
                break;
            case 45:
                addNumber(event.key);
                break;
            case 42:
                addNumber(event.key);
                break;
            case 47:
                addNumber(event.key);
                break;
            case 43:
                addNumber(event.key);
                break;
            case 13:
                checkResult();
                break;
            case 8:
            case 46:
                console.log(event.keyCode)
                remove();
                break;
            default:
                console.log(event.keyCode)
                break;
        }
    });
    var b1 = document.getElementById("b_1");
    b1.onclick = function() { addNumber(1) };

    var b2 = document.getElementById("b_2");
    b2.onclick = function() { addNumber(2) };

    var b3 = document.getElementById("b_3");
    b3.onclick = function() { addNumber(3) };

    var b4 = document.getElementById("b_4");;
    b4.onclick = function() { addNumber(4) };

    var b5 = document.getElementById("b_5");
    b5.onclick = function() { addNumber(5) };

    var b6 = document.getElementById("b_6");
    b6.onclick = function() { addNumber(6) };

    var b7 = document.getElementById("b_7");
    b7.onclick = function() { addNumber(7) };

    var b8 = document.getElementById("b_8");
    b8.onclick = function() { addNumber(8) };

    var b9 = document.getElementById("b_9");
    b9.onclick = function() { addNumber(9) };

    var b0 = document.getElementById("b_0");
    b0.onclick = function() { addNumber(0) };

    var b_plus = document.getElementById("b_plus");
    b_plus.onclick = function() { addNumber('+') };

    var b_minus = document.getElementById("b_minus");
    b_minus.onclick = function() { addNumber('-') };

    var b_multiple = document.getElementById("b_multiple");
    b_multiple.onclick = function() { addNumber('*') };

    var b_divide = document.getElementById("b_div");
    b_divide.onclick = function() { addNumber('/') }

    var b_delete = document.getElementById("b_delete");
    b_delete.onclick = function() { remove() };

    var b_enter = document.getElementById("b_enter");
    b_enter.onclick = function() { checkResult() };


}

function fillMatrix() {

    for (let i = 0; i < current_result_arr.length; i++) {
        let parent = document.getElementsByClassName('row mt-2')[i];
        let children = parent.children;
        for (let j = 0; j < children.length - 1; j++) {
            let array = current_result_arr[i];
            let index = array[j].index;
            children[index].innerHTML = array[j].number;
            children[index].style.background = array[j].color;
            children[index].style.color = 'white';
        }
    }

}

function createBoxes(randNum) {
    // var randNum = generateEquation(myStringEquation, myArrayEquation, dmas_array);
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
    var calcStrArr = ['plus', 'minus', 'div', 'multiple'];
    var calcArr = ['+', '-', '/', '*', ''];
    var strBtn = '';
    for (let i = 0; i < 4; i++) {
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "col-sm-12  d-flex justify-content-center");

        document.getElementById("keyboard").children[0].appendChild(containerDiv);
        if (i == 3) {
            const enterBtn = document.createElement("button");
            enterBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
            enterBtn.setAttribute("id", "b_enter");
            enterBtn.innerText = 'Enter';
            document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(enterBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
            deleteBtn.setAttribute("id", "b_delete");
            deleteBtn.innerText = 'Delete';
            document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(deleteBtn);
        } else {
            for (let j = 0; j < 5; j++) {
                const boxBtn = document.createElement("button");
                boxBtn.setAttribute("class", "box2 mt-2 ml-2 btn btn-secondary");
                strBtn = count;
                if (count == 10) {
                    count = 0;
                    strBtn = 0;
                    boxBtn.setAttribute("id", "b_" + strBtn);
                    boxBtn.innerText = strBtn;

                } else if (count == 0) {
                    if (j == 4) {
                        break;
                    }
                    boxBtn.setAttribute("id", "b_" + calcStrArr[j]);
                    boxBtn.innerText = calcArr[j];



                } else {
                    boxBtn.setAttribute("id", "b_" + count++);
                    boxBtn.innerText = strBtn;

                }

                document.getElementsByClassName(containerDiv.getAttribute('class'))[i].appendChild(boxBtn);
            }
        }
    }
}

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
                children[j - 1].innerHTML = '';
                break;
            }
        } else {
            if (j == 6 && box.innerHTML != '') {
                box.innerHTML = '';
                break;
            }
        }
    }
}

function checkResult() {

    let myEqArr = [],
        orgEqArr = [];
    let isWinCount = 0;

    let sessionArr = [];
    current_result_arr = [];

    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;
    for (let j = 0; j < children.length - 1; j++) {
        myEqArr[j] = children[j].innerHTML;
    }

    console.log('my arr ' + myEqArr);
    try {
        if (eval(myEqArr.join('')) == randNum) {
            myArrayEquation.join('').split('');
            orgEqArr = [...myArrayEquation];
            for (let i = 0; i < myEqArr.length; i++) {
                console.log(orgEqArr[i]);
                if (myEqArr[i] == orgEqArr[i]) {
                    myEqArr[i] = orgEqArr[i] = 'x';
                    children[i].style.background = 'green';
                    isWinCount++;
                    sessionArr.push({ index: i, number: children[i].innerHTML, color: children[i].style.background });
                }
                children[i].style.color = 'white';
            }
            console.log("copied array: " + orgEqArr);
            console.log("real array: " + myArrayEquation);
            console.log("my array: " + myEqArr);
            if (isWinCount == 7) {
                $("#winTitle").toggle();
                statsUpdate("win");
                game_status = "win";
                return "win";
            } else {
                for (let i = 0; i < myEqArr.length; i++) {
                    if (myEqArr[i] != 'x') {
                        if (orgEqArr.indexOf(myEqArr[i]) != -1) {
                            orgEqArr[orgEqArr.indexOf(myEqArr[i])] = myEqArr[i] = 'y';
                            children[i].style.background = 'orange';
                        } else {
                            children[i].style.background = 'black';
                        }
                        sessionArr.push({ index: i, number: children[i].innerHTML, color: children[i].style.background });
                    }
                }
                console.log("copied array: " + orgEqArr);
                console.log("real array: " + myArrayEquation);
                console.log("my array: " + myEqArr);
                $("#a_" + guess_count++).css("display", "none");
                console.log("sessionArr ", sessionArr);
                if (guess_count < 6) {
                    current_result_arr.push(sessionArr);
                    console.log("current ", current_result_arr);
                    $("#a_" + guess_count).css("display", "block");
                    game_status = "next";
                    return "next";
                } else {
                    console.log("loss");
                    game_status = "loss";
                    statsUpdate("loss");
                    $("#lossTitle").toggle();
                }
            }

        } else {
            warningErrorEquation(); //show error red
            shakeBoxes(children);
        }
    } catch (err) {
        console.log(err);
        warningErrorEquation(); //show error red
        shakeBoxes(children);
    }
}

function shakeBoxes(children) {
    for (let j = 0; j < children.length - 1; j++) {
        if (children[j].innerHTML != "" && children[j].innerHTML != undefined)
            children[j].classList.add('shake');

        window.setTimeout(function() {

            children[j].classList.remove('shake');
        }, 500);
    }
}

function statsUpdate(status) {
    played++;
    switch (status) {
        case "win":
            win++;
            winPer = win / played * 100;
            break;
        case "loss":
            winPer = win / played * 100;
            break;
        default:
    }
    $('#statsIframe').contents().find('#won').text(win);
    $('#statsIframe').contents().find('#win').text(winPer + '%');
    $('#statsIframe').contents().find('#played').html(played);

    window.setTimeout(function() { $('#statsBtn').click(); }, 2000);

}

function warningErrorEquation() {
    // get last child of equation
    let parent = document.getElementsByClassName('row mt-2')[guess_count];
    let children = parent.children;

    let el = children[children.length - 1].children[0];
    var original = 'black';
    el.style.color = 'red';
    window.setTimeout(function() { el.style.color = original; }, 1500);

}

function displayIframe() {
    $('.iframe-container').toggle();
}

window.onbeforeunload = function() {
    console.log("hi");
    if (guess_count >= 0)
        window.sessionStorage.setItem("guess_count", guess_count);
    window.sessionStorage.setItem("win", win);
    window.sessionStorage.setItem("played", played);
    window.sessionStorage.setItem("winPer", winPer);
    if (current_result_arr.length != 0)
        window.sessionStorage.setItem("current_result_arr", JSON.stringify(current_result_arr));
}