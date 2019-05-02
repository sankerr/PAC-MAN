var board;//1-empty, 2-pacman, 4-block, 5-ball5, 15-ball15, 25-ball25, 40-cherry, -40-pill, 30-clock
var obj_board;//6-BLINKY, 7-PINKY, 8-INKY, 50-moveShape
var canvas_width;
var canvas_height;
var pacman_shape = new Object();
var blinky_shape = new Object();
var inky_shape = null;
var pinky_shape = null;
var gift_shape = null;
var move_shape = new Object();
var pac_color;
var ball_counter;
var keysDown;
var heart = 3;
var score = 0;
var start_time;
var time_elapsed;
var interval_pacman;
var interval_ghost;
var interval_collisions;
var interval_gift;
var BUBBLES_X_START = 30;
var BUBBLES_X_END = 518;
var BUBBLES_GAP_X = ((BUBBLES_X_END - BUBBLES_X_START) / 28);
var BUBBLES_Y_START = 26;
var BUBBLES_Y_END = 524;
var BUBBLES_GAP_Y = ((BUBBLES_Y_END - BUBBLES_Y_START) / 25);

function init_balls() {
    lblScore.value = 0;
    lblTime.value = time;
    printHearts(heart);
    start_time = new Date();
    board = new Array();
    obj_board  = new Array();
    for (var i = 0; i < 29; i++) {
        if (i===0 || i===19){
            board[i] = [1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1];
            obj_board[i] = [1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1];
        }
        else if (i===1 || i===2 || i===3 || i===20 || i===21){
            board[i] = [1,4,4,4,4,1,4,4,4,4,4,1,4,4,1,4,4,4,4,4,1,4,4,4,4,1];
            obj_board[i] = [1,4,4,4,4,1,4,4,4,4,4,1,4,4,1,4,4,4,4,4,1,4,4,4,4,1];
        }
        else if (i===4 || i===28){
            board[i] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
            obj_board[i] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        }
        else if (i===5 || i===6){
            board[i] = [1,4,4,4,4,1,4,4,1,4,4,4,4,4,4,4,4,1,4,4,1,4,4,4,4,1];
            obj_board[i] = [1,4,4,4,4,1,4,4,1,4,4,4,4,4,4,4,4,1,4,4,1,4,4,4,4,1];
        }
        else if (i===7 || i===25){
            board[i] = [1,1,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,1,1];
            obj_board[i] = [1,1,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,1,1];
        }
        else if (i===8 || i===9){
            board[i] = [4,4,4,4,4,1,4,4,4,4,4,1,4,4,1,4,4,4,4,4,1,4,4,4,4,4];
            obj_board[i] = [4,4,4,4,4,1,4,4,4,4,4,1,4,4,1,4,4,4,4,4,1,4,4,4,4,4];
        }
        else if (i===10 || i===16){
            board[i] = [4,4,4,4,4,1,4,4,1,1,1,1,1,1,1,1,1,1,4,4,1,4,4,4,4,4];
            obj_board[i] = [4,4,4,4,4,1,4,4,1,1,1,1,1,1,1,1,1,1,4,4,1,4,4,4,4,4];
        }
        else if (i===11 || i===12 || i===14 || i===15 || i===17 || i===18){
            board[i] = [4,4,4,4,4,1,4,4,1,4,4,4,4,4,4,4,4,1,4,4,1,4,4,4,4,4];
            obj_board[i] = [4,4,4,4,4,1,4,4,1,4,4,4,4,4,4,4,4,1,4,4,1,4,4,4,4,4];
        }
        else if (i===13){
            board[i] = [1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1];
            obj_board[i] = [1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,1,1,1,1,1];
        }
        else if (i===22){
            board[i] = [1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1];
            obj_board[i] = [1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1];
        }
        else if (i===23 || i===24){
            board[i] = [4,4,1,4,4,1,4,4,1,4,4,4,4,4,4,4,4,1,4,4,1,4,4,1,4,4];
            obj_board[i] = [4,4,1,4,4,1,4,4,1,4,4,4,4,4,4,4,4,1,4,4,1,4,4,1,4,4];
        }
        else if (i===25){
            board[i] = [1,1,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,1,1];
            obj_board[i] = [1,1,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,4,4,1,1,1,1,1,1];
        }
        else if (i===26 || i===27){
            board[i] = [1,4,4,4,4,4,4,4,4,4,4,1,4,4,1,4,4,4,4,4,4,4,4,4,4,1];
            obj_board[i] = [1,4,4,4,4,4,4,4,4,4,4,1,4,4,1,4,4,4,4,4,4,4,4,4,4,1];
        }
        else if (i===28){
            board[i] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
            obj_board[i] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        }
    }
    ball_counter = 0;
    var ball_25 = Math.floor(balls*0.1);
    var ball_15 = Math.floor(balls*0.3);
    var ball_5 = Math.floor(balls*0.6);
    while (ball_counter < ball_25){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 25;
        ball_counter++;
    }
    while (ball_counter < ball_15){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 15;
        ball_counter++;
    }
    while (ball_counter < ball_5){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 5;
        ball_counter++;
    }
    while (ball_counter<=balls){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 5;
        ball_counter++;
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        if (e.code === up) {
            if (pacman_shape.i > 0 && board[pacman_shape.i - 1][pacman_shape.j] !== 4) {
                keysDown[down] = false;
                keysDown[left] = false;
                keysDown[right] = false;
                keysDown[up] = true;
            }
        }
        else if (e.code === down) {
            if (pacman_shape.i < 29 && board[pacman_shape.i + 1][pacman_shape.j] !== 4) {
                keysDown[up] = false;
                keysDown[left] = false;
                keysDown[right] = false;
                keysDown[down] = true;
            }
        }
        else if (e.code === left) {
            if (pacman_shape.j > 0 && board[pacman_shape.i][pacman_shape.j - 1] !== 4) {
                keysDown[down] = false;
                keysDown[up] = false;
                keysDown[right] = false;
                keysDown[left] = true;
            }
        }
        else if (e.code === right) {
            if (pacman_shape.j < 26 && board[pacman_shape.i][pacman_shape.j + 1] !== 4) {
                keysDown[down] = false;
                keysDown[left] = false;
                keysDown[up] = false;
                keysDown[right] = true;
            }
        }
    }, false);
}

function set_interval() {
    interval_pacman = setInterval(UpdatePositionPacman, 250);
    interval_ghost = setInterval(UpdatePositionGhosts, 300);
    interval_collisions = setInterval(checkCollisions, 50);
    interval_gift = setInterval(UpdateGift, 10000);
    play_game();
}

function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 28) + 1);
    var j = Math.floor((Math.random() * 25) + 1);
    while (board[i][j] !== 1) {
        i = Math.floor((Math.random() * 28) + 1);
        j = Math.floor((Math.random() * 25) + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[up]) {
        return 1;
    }
    else if (keysDown[down]) {
        return 2;
    }
    else if (keysDown[left]) {
        return 3;
    }
    else if (keysDown[right]) {
        return 4;
    }
}

function drawBalls() {
    var ctx = getBoardCanevasContext();
    for (var i = 0; i<29;i++) {
        for (var j = 0; j < 26; j++) {
            if (board[i][j] === 5) {
                ctx.beginPath();
                ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 3, 0, 2 * Math.PI);
                ctx.fillStyle = color_5;
                ctx.fill();
                ctx.closePath();
            }
            else if (board[i][j] === 15) {
                ctx.beginPath();
                ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 3, 0, 2 * Math.PI);
                ctx.fillStyle = color_15;
                ctx.fill();
                ctx.closePath();
            }
            else if (board[i][j] === 25) {
                ctx.beginPath();
                ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 3, 0, 2 * Math.PI);
                ctx.fillStyle = color_25;
                ctx.fill();
                ctx.closePath();
            }
        }
    }

}

function init_pacman() {

    var emptyCell = findRandomEmptyCell(obj_board);
    board[emptyCell[0]][emptyCell[1]] = 2;
    pac_color = "yellow";
    pacman_shape.i = emptyCell[0];
    pacman_shape.j = emptyCell[1];

    var ctx = getBoardCanevasContext();
    ctx.beginPath();
    ctx.arc(BUBBLES_Y_START + pacman_shape.j * BUBBLES_GAP_Y, BUBBLES_X_START + pacman_shape.i * BUBBLES_GAP_X, 10, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
    ctx.lineTo(BUBBLES_Y_START + pacman_shape.j * BUBBLES_GAP_Y, BUBBLES_X_START + pacman_shape.i * BUBBLES_GAP_X);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(BUBBLES_Y_START + pacman_shape.j * BUBBLES_GAP_Y + 1, BUBBLES_X_START + pacman_shape.i * BUBBLES_GAP_X - 4, 2, 0, 2 * Math.PI); // circle
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function init_ghost(){
    var g = Number(ghosts);
    obj_board[0][0] = 6;
    blinky_shape.num = 6;
    blinky_shape.i = 0;
    blinky_shape.j = 0;
    blinky_shape.i_last = -1;
    blinky_shape.j_last = -1;

    if (g > 1){
        pinky_shape = new Object();
        obj_board[0][25] = 7;
        pinky_shape.num = 7;
        pinky_shape.i = 0;
        pinky_shape.j = 25;
        pinky_shape.i_last = -1;
        pinky_shape.j_last = -1;
    }
    if (g > 2){
        inky_shape = new Object();
        obj_board[28][0] = 8;
        inky_shape.num = 8
        inky_shape.i = 28;
        inky_shape.j = 0;
        inky_shape.i_last = -1;
        inky_shape.j_last = -1;
    }
    if (move_shape !== null){
        var emptyCell = findRandomEmptyCell(obj_board);
        obj_board[emptyCell[0]][emptyCell[1]] = 50;
        move_shape.i = emptyCell[0];
        move_shape.j = emptyCell[1];
        move_shape.i_last = -1;
        move_shape.j_last = -1;
        move_shape.num = 50;
    }
}

function drawGhost() {
    var g = Number(ghosts);
    var ctx = getBoardCanevasContext();
    var img = document.getElementById("BLINKY");
    ctx.drawImage(img, BUBBLES_Y_START + blinky_shape.j * BUBBLES_GAP_Y - 12, BUBBLES_X_START + blinky_shape.i * BUBBLES_GAP_X - 12, 24, 24);

    if (g > 1){
        var img = document.getElementById("PINKY");
        ctx.drawImage(img, BUBBLES_Y_START + pinky_shape.j * BUBBLES_GAP_Y - 12, BUBBLES_X_START + pinky_shape.i * BUBBLES_GAP_X - 12, 24, 24);
    }
    if (g > 2){
        var img = document.getElementById("INKY");
        ctx.drawImage(img, BUBBLES_Y_START + inky_shape.j * BUBBLES_GAP_Y - 12, BUBBLES_X_START + inky_shape.i * BUBBLES_GAP_X - 12, 24, 24);
    }
}

function UpdatePositionPacman() {
    board[pacman_shape.i][pacman_shape.j] = 1;
    var x = GetKeyPressed();
    if (x === 1) {
        if (pacman_shape.i > 0 && board[pacman_shape.i - 1][pacman_shape.j] !== 4) {
            pacman_shape.i--;
        }
    }
    else if (x === 2) {
        if (pacman_shape.i < 28 && board[pacman_shape.i + 1][pacman_shape.j] !== 4) {
            pacman_shape.i++;
        }
    }
    else if (x === 3) {
        if (pacman_shape.j > 0 && board[pacman_shape.i][pacman_shape.j - 1] !== 4) {
            pacman_shape.j--;
        }
        else if (pacman_shape.i === 13 && pacman_shape.j === 0){
            pacman_shape.j = 25;
        }
    }
    else if (x === 4) {
        if (pacman_shape.j < 25 && board[pacman_shape.i][pacman_shape.j + 1] !== 4) {
            pacman_shape.j++;
        }
        else if (pacman_shape.i === 13 && pacman_shape.j === 25){
            pacman_shape.j = 0;
        }
    }
    if (board[pacman_shape.i][pacman_shape.j] === 5) {
        score+=5;
        ball_counter-=1;
    }
    else if (board[pacman_shape.i][pacman_shape.j] === 15) {
        score+=15;
        ball_counter-=1;
    }
    else if (board[pacman_shape.i][pacman_shape.j] === 25) {
        score+=25;
        ball_counter-=1;
    }
    else if (board[pacman_shape.i][pacman_shape.j] === 40) {
        score+=40;
    }
    else if (board[pacman_shape.i][pacman_shape.j] === -40) {
        score-=40;
    }
    else if (board[pacman_shape.i][pacman_shape.j] === 30) {
        start_time.setSeconds(start_time.getSeconds() + 20);
    }
    board[pacman_shape.i][pacman_shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = Math.floor(Number(time) - (currentTime - start_time) / 1000);
    if (ball_counter === 0) {
        Draw_board();
        //window.clearInterval(interval_pacman);
        clearInterval(interval_collisions);
        clearInterval(interval_pacman);
        clearInterval(interval_ghost);
        clearInterval(interval_gift);
        stop_all();
        play_win();
        window.alert("Game completed");
        newGame();
    }
    else if (Number(time_elapsed)<=0){
        end_game();
    }
    else {
        Draw_board();
        Draw_obj();
    }
}

function UpdatePositionGhosts() {
    if (move_shape !== null) {
        obj_board[move_shape.i][move_shape.j] = 1
        var opt_move = findOptionalMoves(move_shape.i, move_shape.j)
        var max = Number.MIN_SAFE_INTEGER;
        var move = 0;
        for (var i = 0;i<opt_move.length;i++){
            if (!(opt_move[i].x === move_shape.i_last && opt_move[i].y === move_shape.j_last)){
                var tmp_dist = manhattanDistance(opt_move[i].x, opt_move[i].y, pacman_shape.i, pacman_shape.j);
                if (tmp_dist>max){
                    move = i;
                    max = tmp_dist;
                }
            }
        }
        move_shape.i_last = move_shape.i;
        move_shape.j_last = move_shape.j;
        move_shape.i = opt_move[move].x;
        move_shape.j = opt_move[move].y;
        obj_board[move_shape.i][move_shape.j] = move_shape.num;
    }
    moveGhost(blinky_shape);
    if (inky_shape !== null)
        moveGhost(inky_shape);
    if (pinky_shape !== null)
        moveGhost(pinky_shape);
}

function moveGhost2(ghost) {
    obj_board[ghost.i][ghost.j] = 1
    var opt_move = findOptionalMoves(ghost.i, ghost.j)
    var min = Number.MAX_SAFE_INTEGER;
    var move;
    for (var i = 0;i<opt_move.length;i++){
        if (opt_move[i].x === ghost.i_last && opt_move[i].y === ghost.j_last) {

        }
        else {
            var tmp_dist = manhattanDistance(opt_move[i].x, opt_move[i].y, pacman_shape.i, pacman_shape.j);
            if (tmp_dist<min){
                move = i;
                min = tmp_dist;
            }
        }
    }
    ghost.i_last = ghost.i;
    ghost.j_last = ghost.j;
    ghost.i = opt_move[move].x;
    ghost.j = opt_move[move].y;
    obj_board[ghost.i][ghost.j] = ghost.num;
}

function moveGhost(ghost) {
    obj_board[ghost.i][ghost.j] = 1
    var opt_move = findOptionalMoves(ghost.i, ghost.j)
    var min = Number.MAX_SAFE_INTEGER;
    var move;
    for (var i = 0;i<opt_move.length;i++){
        if (opt_move[i].x === ghost.i_last && opt_move[i].y === ghost.j_last) {
			if (opt_move.length === 1)
				move = i;
        }
        else {
            var tmp_dist = euclideanDistance(opt_move[i].x, opt_move[i].y, pacman_shape.i, pacman_shape.j);
            if (tmp_dist<min){
                move = i;
                min = tmp_dist;
            }
        }
    }
    ghost.i_last = ghost.i;
    ghost.j_last = ghost.j;
    ghost.i = opt_move[move].x;
    ghost.j = opt_move[move].y;
    obj_board[ghost.i][ghost.j] = ghost.num;
}

function Draw_obj() {
    var ctx = getBoardCanevasContext();
    for (var i = 0; i<29;i++) {
        for (var j = 0; j < 26; j++) {
            if (obj_board[i][j] === 6) {
                var img = document.getElementById("BLINKY");
                ctx.drawImage(img, BUBBLES_Y_START + j * BUBBLES_GAP_Y - 12, BUBBLES_X_START + i * BUBBLES_GAP_X - 12, 24, 24);
            } else if (obj_board[i][j] === 7) {
                var img = document.getElementById("PINKY");
                ctx.drawImage(img, BUBBLES_Y_START + j * BUBBLES_GAP_Y - 12, BUBBLES_X_START + i * BUBBLES_GAP_X - 12, 24, 24);
            } else if (obj_board[i][j] === 8) {
                var img = document.getElementById("INKY");
                ctx.drawImage(img, BUBBLES_Y_START + j * BUBBLES_GAP_Y - 12, BUBBLES_X_START + i * BUBBLES_GAP_X - 12, 24, 24);
            } else if (obj_board[i][j] === 50) {
                var img = document.getElementById("move_shape");
                ctx.drawImage(img, BUBBLES_Y_START + j * BUBBLES_GAP_Y - 12, BUBBLES_X_START + i * BUBBLES_GAP_X - 12, 24, 24);
            }
        }
    }
}

function Draw_board() {
    lblScore.value = score;
    lblTime.value = time_elapsed;
    var ctx = getBoardCanevasContext();
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    drawBoard();
    for (var i = 0; i<29;i++) {
        for (var j = 0; j < 26; j++) {
            if (board[i][j] === 5) {
                ctx.beginPath();
                ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 3, 0, 2 * Math.PI);
                ctx.fillStyle = color_5;
                ctx.fill();
                ctx.closePath();
            }
            else if (board[i][j] === 15) {
                ctx.beginPath();
                ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 3, 0, 2 * Math.PI);
                ctx.fillStyle = color_15;
                ctx.fill();
                ctx.closePath();
            }
            else if (board[i][j] === 25) {
                ctx.beginPath();
                ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 3, 0, 2 * Math.PI);
                ctx.fillStyle = color_25;
                ctx.fill();
                ctx.closePath();
            }
            else if (board[i][j] === 2){
                drawPacman(ctx, i, j);
            }
            else if (board[i][j] === 40) {
                var img = document.getElementById("cherry");
                ctx.drawImage(img, BUBBLES_Y_START + j * BUBBLES_GAP_Y - 10, BUBBLES_X_START + i * BUBBLES_GAP_X - 10, 20, 20);
            }
            else if (board[i][j] === -40) {
                var img = document.getElementById("green_pill");
                ctx.drawImage(img, BUBBLES_Y_START + j * BUBBLES_GAP_Y - 10, BUBBLES_X_START + i * BUBBLES_GAP_X - 10, 20, 20);
            }
            else if (board[i][j] === 30) {
                var img = document.getElementById("clock");
                ctx.drawImage(img, BUBBLES_Y_START + j * BUBBLES_GAP_Y - 10, BUBBLES_X_START + i * BUBBLES_GAP_X - 10, 20, 20);
            }
        }
    }
}

function drawPacman(ctx, i, j) {
    ctx.beginPath();
    if (keysDown[up]) {
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 10, -0.35 * Math.PI, 1.35 * Math.PI); // half circle
        ctx.lineTo(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y - 4, BUBBLES_X_START + i * BUBBLES_GAP_X - 1, 2, 0, 2 * Math.PI); // circle
        ctx.fillStyle = "black";
        ctx.fill();
    }
    else if (keysDown[down]) {
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 10, 0.68 * Math.PI, 2.33 * Math.PI); // half circle
        ctx.lineTo(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y - 4, BUBBLES_X_START + i * BUBBLES_GAP_X + 1, 2, 0, 2 * Math.PI); // circle
        ctx.fillStyle = "black";
        ctx.fill();
    }
    else if (keysDown[left]) {
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 10, 1.15 * Math.PI, 2.85 * Math.PI); // half circle
        ctx.lineTo(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y - 1, BUBBLES_X_START + i * BUBBLES_GAP_X - 4, 2, 0, 2 * Math.PI); // circle
        ctx.fillStyle = "black";
        ctx.fill();
    }
    else {
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X, 10, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        ctx.lineTo(BUBBLES_Y_START + j * BUBBLES_GAP_Y, BUBBLES_X_START + i * BUBBLES_GAP_X);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(BUBBLES_Y_START + j * BUBBLES_GAP_Y + 1, BUBBLES_X_START + i * BUBBLES_GAP_X - 4, 2, 0, 2 * Math.PI); // circle
        ctx.fillStyle = "black";
        ctx.fill();
    }
    ctx.closePath();

}

function checkCollisions() {
    var collision = false;
    if (blinky_shape.i === pacman_shape.i && blinky_shape.j === pacman_shape.j) {
        heart--;
        score-=10;
        collision = true;
    }
    else if (inky_shape != null && inky_shape.i === pacman_shape.i && inky_shape.j === pacman_shape.j) {
        heart--;
        score-=10;
        collision = true;
    }
    else if (pinky_shape != null && pinky_shape.i === pacman_shape.i && pinky_shape.j === pacman_shape.j) {
        heart--;
        score-=10;
        collision = true;
    }
    else if (move_shape != null && move_shape.i === pacman_shape.i && move_shape.j === pacman_shape.j) {
        score+=50;
        obj_board[move_shape.i][move_shape.j] = 1;
        move_shape = null;
    }
    if (heart === 0)
        end_game();
    else if (collision) {
        printHearts();
        newRound();
    }

}

function findOptionalMoves(x, y) {
    var options = [];
    if (x - 1 >= 0 && clearPoint(x - 1, y))
        options.push({x: x - 1, y: y});
    if (y - 1 >= 0 && clearPoint(x, y - 1))
        options.push({x: x, y: y - 1});
    if (x + 1 <= 28 && clearPoint(x + 1, y))
        options.push({x: x + 1, y: y});
    if (y + 1 <= 25 && clearPoint(x, y + 1))
        options.push({x: x, y: y + 1});
    if (x === 13 && y === 0){
        if (clearPoint(x, 25))
            options.push({x: x, y: 25})
    }
    if (x === 13 && y === 25){
        if (clearPoint(x, 0))
            options.push({x: x, y: 0})
    }
    return options;
}

function clearPoint(x, y) {
    return obj_board[x][y] === 1;
}

function manhattanDistance(x1, y1, x2, y2){
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}

function euclideanDistance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function UpdateGift() {
    if (gift_shape === null) {
        gift_shape = new Object();
        var emptyCell = findRandomEmptyCell(board);
        gift_shape.i = emptyCell[0];
        gift_shape.j = emptyCell[1];
        var x = Math.random();
        if (x<0.01) {
            board[emptyCell[0]][emptyCell[1]] = 40;
        } else if (x<0.99){
            board[emptyCell[0]][emptyCell[1]] = 30;
        } else {
            board[emptyCell[0]][emptyCell[1]] = -40;
        }
    }
    else {
        board[gift_shape.i][gift_shape.j] = 1;
        gift_shape = null;
    }
}

function printHearts()
{
    var canvas = document.getElementById('lblHeart');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById("heart");

    if (heart === 3){
        ctx.drawImage(img, 0, 30, 90, 140);
        ctx.drawImage(img, 90, 30, 90, 140);
        ctx.drawImage(img, 180, 30, 90, 140);
    } else if (heart === 2){
        ctx.drawImage(img, 0, 30, 90, 140);
        ctx.drawImage(img, 90, 30, 90, 140);
    } else if (heart === 1){
        ctx.drawImage(img, 0, 30, 90, 140);
    }

}

function newRound() {
    clearInterval(interval_pacman);
    clearInterval(interval_ghost);
    clearInterval(interval_collisions);
    clearInterval(interval_gift);
    stop_game();
    play_collisions();
    board[pacman_shape.i][pacman_shape.j] = 1;
    obj_board[blinky_shape.i][blinky_shape.j] = 1;
    if (inky_shape !== null)
        obj_board[inky_shape.i][inky_shape.j] = 1;
    if (pinky_shape !== null)
        obj_board[pinky_shape.i][pinky_shape.j] = 1;
    if (move_shape !== null)
        obj_board[move_shape.i][move_shape.j] = 1;
    init_ghost();
    init_pacman();
    Draw_board();
    Draw_obj();
    setTimeout(set_interval, 2000);
}

function end_game() {
    clearInterval(interval_collisions);
    clearInterval(interval_pacman);
    clearInterval(interval_ghost);
    clearInterval(interval_gift);
    stop_game();
    play_collisions();
    $('#board').hide();
    $('#game_over_div').show();
}

function rest_bord() {
    clearInterval(interval_collisions);
    clearInterval(interval_pacman);
    clearInterval(interval_ghost);
    clearInterval(interval_gift);
    stop_all();
    if (pre_game_validator !== null){
        pre_game_validator.resetForm();
    }
    board;//1-empty, 2-pacman, 4-block, 5-ball5, 15-ball15, 25-ball25, 40-cherry, -40-pill, 50-moveShape
    obj_board;//6-BLINKY, 7-PINKY, 8-INKY
    canvas_width;
    canvas_height;
    pacman_shape = new Object();
    blinky_shape = new Object();
    inky_shape = null;
    pinky_shape = null;
    gift_shape = null;
    move_shape = new Object();
    pac_color;
    ball_counter;
    keysDown;
    score = 0;
    start_time;
    heart = 3;
    time_elapsed;
    interval_pacman;
    interval_ghost;
    interval_collisions;
    interval_gift;
}

$("#new_game").click(function() {
    $('#game_over_div').hide();
    $('#board').show();
	newGame();
});

function newGame() {
    pacman_shape = new Object();
    blinky_shape = new Object();
    inky_shape = null;
    pinky_shape = null;
    gift_shape = null;
    move_shape = new Object();
    heart = 3;
    score = 0;
    initBoard();
    drawBoard();
    drawBoardDoor();
    init_balls();
    drawBalls();
    init_ghost();
    drawGhost();
    init_pacman();
    set_interval();
}