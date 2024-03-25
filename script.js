const left = document.getElementById('arrow-left');
const forward = document.getElementById('arrow-forward');
const back = document.getElementById('arrow-back');
const right = document.getElementById('arrow-right');
const viewport = document.getElementById('viewport');
const playButton = document.getElementById('playButton');
const inventory = document.getElementById('inventory');
const rooms =
    [['', 'fadeToWhite', ''],
    ['', 'images/stairRoom.jpeg', ''],
    ['images/whiteRoom.jpeg', 'images/entryRoom.jpeg', 'images/candleRoom.jpeg']]
let currX = 2;
let currY = 1;
let isAudioPlaying = false;
let interactiveArea = document.getElementById('interactiveArea');



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
        if (!document.getElementById('mirror')) {
            let mirror = document.createElement('img');
            mirror.id = 'mirror'
            mirror.src = 'images/mirror.png';
            mirror.height = 100;
            mirror.width = 100;
            mirror.z_index = 1000;
            inventory.appendChild(mirror);
        }
    } else if (currentRoomImage === 'entryRoom.jpeg') {
        audioElement = document.getElementById('entryAudio');
    } else if (currentRoomImage === 'candleRoom.jpeg') {
        audioElement = document.getElementById('candleAudio');
        if (!document.getElementById('flame')) {
            let flame = document.createElement('img')
            flame.id = 'flame';
            flame.src = 'images/flame.png';
            flame.height = 100;
            flame.width = 100;
            flame.z_index = 1000;
            inventory.appendChild(flame);
        }
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
    if (newSrc.includes('fadeToWhite')) {
        fadeInWhiteScreen();
    }
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

function fadeInWhiteScreen() {
    const overlay = document.getElementById('whiteOverlay');
    overlay.style.display = 'block';
    let opacity = 0;

    const fade = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            overlay.style.opacity = opacity.toString();
        } else {
            clearInterval(fade);
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.opacity = '0';
                if (!document.getElementById('mirror') || !document.getElementById('flame')) {
                    currX = 2;
                    currY = 1;
                    changeRoom(rooms[currX][currY]);
                    updateButtonVisibility();
                    let audioElement = document.getElementById('resetAudio');
                    audioElement.play()
                } else {
                    let audioElement = document.getElementById('escapeAudio');
                    audioElement.play()
                    viewport.src = 'images/landscape.jpeg';
                    let infoElement = document.getElementById('info');
                    infoElement.innerHTML = 'Congratulations! You have escaped the room!';
                }

            }, 5000);
        }
    }, 100);
}