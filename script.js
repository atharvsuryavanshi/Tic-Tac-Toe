let divCell = $('.div-cell');
let divScoreBoard = $('#div-score-board');
let buttonRestartGame = $('#button-restart-game');
let spanScoreO = $('#span-score-o');
let spanScoreX = $('#span-score-x');

let currentSymbol = 'o.png';
let winnerFound = false;
let wonAtLeastOneGame = true;
let scoreBoard = {
    o: 0,
    x: 0
}

const cells = [
    { id: 'div-cell-a0', symbol: '' }, { id: 'div-cell-a1', symbol: '' }, { id: 'div-cell-a2', symbol: '' },
    { id: 'div-cell-b0', symbol: '' }, { id: 'div-cell-b1', symbol: '' }, { id: 'div-cell-b2', symbol: '' },
    { id: 'div-cell-c0', symbol: '' }, { id: 'div-cell-c1', symbol: '' }, { id: 'div-cell-c2', symbol: '' },
]

$(function () {
    $(document).on('selectstart', function () {
        return false;
    });

    $(document).on('dragstart', function () {
        return false;
    });

    divCell.on('mouseenter', function () {
        $(this).toggleClass('bg-secondary');
    });

    divCell.on('mouseleave', function () {
        $(this).toggleClass('bg-secondary');
    });

    divCell.on('click', function () {
        console.log(winnerFound);

        if (!winnerFound) {
            let id = $(this).data('cell-id');
            let img = $('<img>').attr('src', `static/images/${currentSymbol}`).addClass('img-fluid');
            if (cells.find(cell => cell.id == id).symbol == "") {
                $(this).append(img);
                cells.find(cell => cell.id == id).symbol = currentSymbol;
                findTheWinner();
                if (!winnerFound) {
                    currentSymbol = nextSymbol();
                }
            }
        }
    });
});

function nextSymbol() {
    return currentSymbol === 'o.png' ? 'x.png' : 'o.png';
}

function findTheWinner() {
    // // horizontal cases
    ifThree(cells[0], cells[1], cells[2]);
    ifThree(cells[3], cells[4], cells[5]);
    ifThree(cells[6], cells[7], cells[8]);

    // // vertical cases
    ifThree(cells[0], cells[3], cells[6]);
    ifThree(cells[1], cells[4], cells[7]);
    ifThree(cells[2], cells[5], cells[8]);

    // // diagonal cases
    ifThree(cells[0], cells[4], cells[8]);
    ifThree(cells[2], cells[4], cells[6]);

    if (wonAtLeastOneGame){
        spanScoreO.text(`:${scoreBoard.o}`);
        spanScoreX.text(`:${scoreBoard.x}`);
    }

    if (cells.every(cell => cell.symbol !== "")) {
        buttonRestartGame.removeClass('visually-hidden');
    }
}

function ifThree(cell1, cell2, cell3) {
    if (!winnerFound) {
        if (areStringsSame(cell1.symbol, cell2.symbol, cell3.symbol)) {
            winnerFound = true;
            if (!wonAtLeastOneGame) {
                wonAtLeastOneGame = true;

            }
            currentSymbol == 'o.png' ? scoreBoard.o++ : scoreBoard.x++;
            if (wonAtLeastOneGame && divScoreBoard.hasClass('visually-hidden')) {
                divScoreBoard.removeClass('visually-hidden');
            }
            highlightBg(cell1.id);
            highlightBg(cell2.id);
            highlightBg(cell3.id);
        }
    }
}

function highlightBg(id) {
    let elem = $(`[data-cell-id="${id}"]`);
    elem.addClass('bg-warning');
    buttonRestartGame.removeClass('visually-hidden');
}

function restartGame() {
    winnerFound = false;
    divCell.removeClass('bg-warning');
    buttonRestartGame.addClass('visually-hidden');
    divCell.empty();
    cells.forEach(cell => cell.symbol = "");
}

function areStringsSame(...args) {
    if (args.length === 0 || args.includes("")) {
        return false;
    }

    const firstString = args[0];
    return args.every(str => str === firstString);
}