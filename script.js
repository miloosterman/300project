const left = document.getElementById('left');
const forward = document.getElementById('forward');
const back = document.getElementById('back');
const right = document.getElementById('right');
const viewport = document.getElementById('viewport');
const rooms =
    [['', '', ''],
    ['', 'images/stairWay.jpeg', ''],
    ['images/cultist00.jpeg', 'images/pathRoom.jpeg', 'images/candleRoom.jpeg']]
let currX = 2;
let currY = 1;

setButtonFunctions();

function setButtonFunctions() {
    left.onclick = (e) => {
        if (rooms[currX][currY - 1] != '') {
            currY--;
            viewport.src = rooms[currX][currY];
        }
    }
    right.onclick = (e) => {
        if (rooms[currX][currY + 1] != '') {
            currY++;
            viewport.src = rooms[currX][currY];
        }
    }
    forward.onclick = (e) => {
        if (rooms[currX - 1][currY] != '') {
            currX--;
            viewport.src = rooms[currX][currY];
        }
    }
    back.onclick = (e) => {
        if (rooms[currX + 1][currY] != '') {
            currX++;
            viewport.src = rooms[currX][currY];
        }
    }
}