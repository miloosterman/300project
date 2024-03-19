const left = document.getElementById('arrow-left');
const forward = document.getElementById('arrow-forward');
const back = document.getElementById('arrow-back');
const right = document.getElementById('arrow-right');
const viewport = document.getElementById('viewport');
const playButton = document.getElementById('playButton');
const rooms =
    [['', '', ''],
    ['', 'images/stairRoom.jpeg', ''],
    ['images/whiteRoom.jpeg', 'images/entryRoom.jpeg', 'images/candleRoom.jpeg']]
let currX = 2;
let currY = 1;
let isAudioPlaying = false;

setButtonFunctions();
updateButtonVisibility();

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault();
        playRoomSpecificAudio();
    }
});

function playRoomSpecificAudio() {
    const currentRoomImage = viewport.src.split('/').pop();

    let audioElement;

    if (currentRoomImage === 'whiteRoom.jpeg') {
        audioElement = document.getElementById('whiteAudio');
    } else if (currentRoomImage === 'entryRoom.jpeg') {
        audioElement = document.getElementById('entryAudio');
    } else if (currentRoomImage === 'candleRoom.jpeg') {
        audioElement = document.getElementById('candleAudio');
    } else if (currentRoomImage === 'stairRoom.jpeg') {
        audioElement = document.getElementById('stairAudio');
    }

    if (audioElement) {
        if (isAudioPlaying) {
            audioElement.pause();
            audioElement.currentTime = 0;
            isAudioPlaying = false;
            return;
        } else {
            audioElement.play()
                .then(() => {
                    console.log('Audio playback started successfully.');
                    isAudioPlaying = true;
                })
                .catch(error => {
                    console.error('Failed to start audio playback:', error);
                });
        }
    }
}

function changeRoom(newSrc) {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    viewport.src = newSrc;
    isAudioPlaying = false;
    updateButtonVisibility();
}

function setButtonFunctions() {
    left.onclick = (e) => {
        if (rooms[currX][currY - 1] != '') {
            currY--;
            changeRoom(rooms[currX][currY]);
        }
    }
    right.onclick = (e) => {
        if (rooms[currX][currY + 1] != '') {
            currY++;
            changeRoom(rooms[currX][currY]);
        }
    }
    forward.onclick = (e) => {
        if (rooms[currX - 1][currY] != '') {
            currX--;
            changeRoom(rooms[currX][currY]);
        }
    }
    back.onclick = (e) => {
        if (rooms[currX + 1][currY] != '') {
            currX++;
            changeRoom(rooms[currX][currY]);
        }
    }
}
function updateButtonVisibility() {
    left.style.display = rooms[currX][currY - 1] ? 'block' : 'none';
    right.style.display = rooms[currX][currY + 1] ? 'block' : 'none';
    forward.style.display = rooms[currX - 1] && rooms[currX - 1][currY] ? 'block' : 'none';
    back.style.display = rooms[currX + 1] && rooms[currX + 1][currY] ? 'block' : 'none';
}