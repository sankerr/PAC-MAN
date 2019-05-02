var game_audio = new Audio("audio/game.mp3");
var win = new Audio("audio/win_sound.mp3");
var collisions = new Audio("audio/hit_sound.mp3");
var ready = new Audio("audio/Lets get ready to rumble.mp3");

function play_game() {
    game_audio.loop = true;
    game_audio.play();
}

function stop_game() {
    game_audio.pause();
    game_audio.currentTime = 0;
}

function play_collisions() {
    collisions.play();
}

function stop_collisions() {
    collisions.pause();
    collisions.currentTime = 0;
}

function play_win() {
    win.play();
}

function stop_win() {
    win.pause();
    win.currentTime = 0;
}

function stop_all() {
    stop_game();
    stop_collisions();
    stop_win();
}
