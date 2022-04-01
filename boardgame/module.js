var org = [1, 'x', 1, 'x', 3, 'x', 3];
var mine = [3, 'x', 3, 'x', 1, 'x', 1];
console.log("mine " + mine);
console.log("org " + org);

for (let i = 0; i < mine.length; i++) {
    if (mine[i] == org[i]) {
        mine[i] = 'x';
        org[i] = 'x';
    }
}
for (let i = 0; i < mine.length; i++) {
    if (mine[i] != 'x' && mine[i] != 'y') {
        if (org.indexOf(mine[i]) != -1) {
            org[org.indexOf(mine[i])] = 'y';
            mine[i] = 'y';

        }

    }
}

console.log("mine " + mine);
console.log("org " + org);

// console.log("place 6" + org[1]);
console.log(org.indexOf(mine[0]));