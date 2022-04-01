function generateEquation(myArrayEquation, dmas_array) {
    var randomNum;
    for (let i = 0; i < 7; i++) {
        if (i % 2 == 0) {
            randomNum = Math.floor(Math.random() * 10);
            myArrayEquation[i] = randomNum + '';
            if (i != 0) {
                if (myArrayEquation[i - 1] == '/') {
                    try {

                        while (!Number.isInteger(eval(myArrayEquation.join(''))) || randomNum == 0) {
                            randomNum = Math.floor(Math.random() * 10);
                            myArrayEquation[i] = randomNum + '';
                        }
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }

        } else {
            let index_random = Math.floor(Math.random() * 4);
            myArrayEquation[i] = dmas_array[index_random];
        }
    }
    console.log(eval(myArrayEquation));
    return eval(myArrayEquation.join(''));
}