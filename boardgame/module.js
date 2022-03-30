var numbers_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var dmas_array = ['+', '-', '*', '/'];
// console.log(Math.floor(Math.random() * 4));

var myStringEquation = "";
var myArrayEquation = [];

export function generateEquation() {
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
                    console.log("before " + eval(myStringEquation));

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

try {
    generateEquation();
} catch (error) {
    console.error(error);
    generateEquation();
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
}



console.log(eval(myStringEquation));
console.log((myStringEquation));
console.log((myArrayEquation));

function isInt(n) {
    return n % 1 === 0;
}