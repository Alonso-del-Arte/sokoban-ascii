var initBoardElem, boardElem, boardDiv;
var statsDiv, nextLevelSpan;
var initialState = [], currentState = [];
var playerX, playerY;
var moveCount = 0, pushCount = 0, boxCount = 0, boxOnGoalCount = 0, 
    goalCount = 0;

function queryPosition(x, y) {
    return currentState[x][y];
}

function changePosition(x, y, token) {
    currentState[x][y] = token;
}

function canPush(absX, absY, relX, relY) {
    var currBoxToken = queryPosition(absX, absY);
    var proposedX = absX + relX;
    var proposedY = absY + relY;
    switch (queryPosition(proposedX, proposedY)) {
        case " ":
            if (currBoxToken == "*") {
                changePosition(absX, absY, ".");
                boxOnGoalCount--;
            } else {
                changePosition(absX, absY, " ");
            }
            changePosition(proposedX, proposedY, "$");
            pushCount++;
            return true;
        case ".":
            if (currBoxToken == "*") {
                changePosition(absX, absY, ".");
            } else {
                changePosition(absX, absY, " ");
                boxOnGoalCount++;
            }
            changePosition(proposedX, proposedY, "*");
            pushCount++;
            return true;
        default:
            return false;
    }
}

function canMove(relativeX, relativeY) {
    var currPlayerToken = queryPosition(playerX, playerY);
    if (relativeX == 0 && relativeY == 0) {
        return false;
    }
    var absoluteX = playerX + relativeX;
    var absoluteY = playerY + relativeY;
    var playerToken = "@";
    switch (queryPosition(absoluteX, absoluteY)) {
        case "*":
            playerToken = "+";
        case "$":
            if (canPush(absoluteX, absoluteY, relativeX, relativeY)) {
                if (currPlayerToken == "@") {
                    changePosition(playerX, playerY, " ");
                } else {
                    changePosition(playerX, playerY, ".");
                }
                playerX = absoluteX;
                playerY = absoluteY;
                changePosition(playerX, playerY, playerToken);
                moveCount++;
                return true;
            }
            return false;
        case " ":
            if (currPlayerToken == "@") {
                changePosition(playerX, playerY, " ");
            } else {
                changePosition(playerX, playerY, ".");
            }
            playerX = absoluteX;
            playerY = absoluteY;
            changePosition(playerX, playerY, "@");
            moveCount++;
            return true;
        case ".":
            if (currPlayerToken == "@") {
                changePosition(playerX, playerY, " ");
            } else {
                changePosition(playerX, playerY, ".");
            }
            playerX = absoluteX;
            playerY = absoluteY;
            changePosition(playerX, playerY, "+");
            moveCount++;
            return true;
        default:
            return false;
    }
}

function processArrowKey(e) {
    var x, y;
    switch(e.keyCode) {
        case 37:
            x = 0;
            y = -1;
            break;
        case 38:
            x = -1;
            y = 0;
            break;
        case 39:
            x = 0;
            y = 1;
            break;
        case 40:
            x = 1;
            y = 0;
            break;
        default:
            x = 0;
            y = 0;
    }
    if (canMove(x, y)) {
        writeBoard();
    }
}

function parseBoard(boardStr) {
    var parsedSoFar = [];
    var rowsSoFar = [];
    var character;
    var row = 0;
    var col = 0;
    for (var i = 0; i < boardStr.length; i++) {
        character = boardStr.charAt(i);
        switch (character) {
            case "#":
                parsedSoFar.push("#");
                col++;
                break;
            case " ":
            case "-":
            case "_":
                parsedSoFar.push(" ");
                col++;
                break;
            case "@":
            case "p":
                parsedSoFar.push("@");
                playerX = row;
                playerY = col;
                col++;
                break;
            case "+":
            case "P":
                parsedSoFar.push("+");
                playerX = row;
                playerY = col;
                col++;
                goalCount++;
                break;
            case "$":
            case "b":
                parsedSoFar.push("$");
                col++;
                boxCount++;
                break;
            case "*":
            case "B":
                parsedSoFar.push("*");
                col++;
                boxCount++;
                boxOnGoalCount++;
                goalCount++;
                break;
            case ".":
                parsedSoFar.push(".");
                col++;
                goalCount++;
                break;
            case ";":
                rowsSoFar.push(parsedSoFar);
                parsedSoFar = [];
                col = 0;
                row++;
        }
    }
    if (parsedSoFar.length > 0) {
        rowsSoFar.push(parsedSoFar);
    }
    return rowsSoFar;
}

function writeBoard() {
    var brd = "";
    for (var row = 0; row < currentState.length; row++) {
        brd = brd + "<tr>";
        for (var col = 0; col < currentState[row].length; col++) {
            brd = brd + "<td class=\"";
            switch (currentState[row][col]) {
                case " ":
                    brd = brd + "floor\"> ";
                    break;
                case "#":
                    brd = brd + "wall\">#";
                    break;
                case "@":
                    brd = brd + "pusher\">@";
                    break;
                case "+":
                    brd = brd + "pusherOnGoal\">+";
                    break;
                case "$":
                    brd = brd + "box\">$";
                    break;
                case "*":
                    brd = brd + "boxOnGoal\">*";
                    break;
                case ".":
                    brd = brd + "goal\">.";
            }
            brd = brd + "</td>";
        }
        brd = brd + "</tr>";
    }
    boardElem.innerHTML = brd;
    statsDiv.innerHTML = "Moves: " + moveCount + " &mdash; Pushes: " + 
        pushCount + " &mdash; Boxes: " + boxCount + " &mdash; Boxes on goals: " + 
        boxOnGoalCount;
    if (boxCount == boxOnGoalCount) {
        alert("Congratulations, you've solved it!");
        nextLevelSpan.style.display = "inherit";
    }
}

function initialize() {
    initBoardElem = document.getElementsByTagName("pre").item(0);
    initialState = parseBoard(initBoardElem.innerHTML);
    currentState = initialState;
    boardElem = document.createElement("table");
    document.onkeydown = processArrowKey;
    boardDiv = document.getElementById("board");
    boardDiv.appendChild(boardElem);
    initBoardElem.style.display = "none";
    statsDiv = document.getElementById("stats");
    nextLevelSpan = document.getElementById("nextLevelLink");
    if (boxCount != goalCount) {
        alert("WARNING: This level has " + boxCount + " box(es) but " + 
              goalCount + " goal(s)");
    }
    writeBoard();
}
