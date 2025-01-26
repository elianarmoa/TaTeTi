document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');  // Selecciona todas las celdas
    const status = document.getElementById('status');  // Selecciona el elemento de estado
    const restartButton = document.getElementById('restartButton');  // Selecciona el botón de reinicio

    let currentPlayer = 'X';  // Empieza con el jugador X
    let gameActive = true;  // Controla si el juego está activo

    // Función para manejar los clics en las celdas
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-cell');

        // Si la celda ya tiene un valor o el juego ha terminado, no hacer nada
        if (cell.textContent !== '' || !gameActive) {
            return;
        }

        // Marcar la celda con el jugador actual
        cell.textContent = currentPlayer;

        // Verificar si hay un ganador
        if (checkWinner()) {
            status.textContent = `¡${currentPlayer} ha ganado!`;
            gameActive = false;
        } else if (isDraw()) {
            status.textContent = '¡Es un empate!';
            gameActive = false;
        } else {
            // Cambiar al siguiente jugador
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Es el turno de ${currentPlayer}`;
        }
    }

    // Función para verificar si hay un ganador
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columnas
            [0, 4, 8], [2, 4, 6]  // Diagonales
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a].textContent === currentPlayer &&
                cells[b].textContent === currentPlayer &&
                cells[c].textContent === currentPlayer;
        });
    }

    // Función para verificar si hay un empate
    function isDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    // Agregar evento a cada celda
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Función para reiniciar el juego
    restartButton.addEventListener('click', () => {
        cells.forEach(cell => cell.textContent = '');  // Limpiar las celdas
        currentPlayer = 'X';  // Volver a empezar con X
        status.textContent = 'Es el turno de X';  // Mostrar el mensaje de inicio
        gameActive = true;  // Reanudar el juego
    });
});
