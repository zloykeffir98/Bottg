let board = ['', '', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Функция для создания игрового поля
function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';  // Очистить поле

    // Создать ячейки для игрового поля
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

// Функция для обработки клика по ячейке
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;  // Проверка, если ячейка уже занята или игра завершена

    board[index] = currentPlayer;  // Заполнить ячейку текущим игроком
    createBoard();  // Обновить игровое поле

    // Проверка на выигрыш
    if (checkWin()) {
        alert(`Игрок ${currentPlayer} выиграл!`);
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        alert('Ничья!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Смена игрока
    }
}

// Функция для проверки условий выигрыша
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

// Запуск игры
createBoard();