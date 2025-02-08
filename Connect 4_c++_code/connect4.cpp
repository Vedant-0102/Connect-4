#include <iostream>
#include <string>

#define MAX_HEIGHT 6
#define MAX_WIDTH 6

using namespace std;

void clearScreen() {
    cout << "\033[2J\033[H"; // Clear screen and move cursor to the top-left
}

void showGrid(char matrix[MAX_WIDTH][MAX_HEIGHT]) {
    for (int row = MAX_HEIGHT - 1; row >= 0; --row) {
        for (int column = 0; column < MAX_WIDTH; ++column) {
            if (matrix[column][row] == '\0') {
                cout << " . ";
            } else {
                cout << " " << matrix[column][row] << " ";
            }
        }
        cout << "\n";
    }
}

bool isVictory(char matrix[MAX_WIDTH][MAX_HEIGHT], char marker) {
    for (int row = 0; row < MAX_HEIGHT; ++row) {
        for (int column = 0; column < MAX_WIDTH; ++column) {
            if (column <= MAX_WIDTH - 4 && matrix[column][row] == marker &&
                matrix[column + 1][row] == marker && matrix[column + 2][row] == marker &&
                matrix[column + 3][row] == marker)
                return true;

            if (row <= MAX_HEIGHT - 4 && matrix[column][row] == marker &&
                matrix[column][row + 1] == marker && matrix[column][row + 2] == marker &&
                matrix[column][row + 3] == marker)
                return true;

            if (column <= MAX_WIDTH - 4 && row <= MAX_HEIGHT - 4 &&
                matrix[column][row] == marker && matrix[column + 1][row + 1] == marker &&
                matrix[column + 2][row + 2] == marker && matrix[column + 3][row + 3] == marker)
                return true;

            if (column >= 3 && row <= MAX_HEIGHT - 4 &&
                matrix[column][row] == marker && matrix[column - 1][row + 1] == marker &&
                matrix[column - 2][row + 2] == marker && matrix[column - 3][row + 3] == marker)
                return true;
        }
    }
    return false;
}

bool dropDisc(char matrix[MAX_WIDTH][MAX_HEIGHT], int columnChoice, char marker) {
    for (int row = 0; row < MAX_HEIGHT; ++row) {
        if (matrix[columnChoice][row] == '\0') {
            matrix[columnChoice][row] = marker;
            return true;
        }
    }
    return false;
}

int main() {
    char matrix[MAX_WIDTH][MAX_HEIGHT] = {};
    string playerOne, playerTwo;
    char activePlayer = 'X';
    int columnInput;

    cout << "Enter name for Player 1 (X): ";
    getline(cin, playerOne);
    cout << "Enter name for Player 2 (O): ";
    getline(cin, playerTwo);

    while (true) {
        clearScreen(); // Clear the screen before showing the grid
        showGrid(matrix);
        cout << ((activePlayer == 'X') ? playerOne : playerTwo) << ", select a column (1-6): ";
        cin >> columnInput;
        columnInput--;  // Adjust for 0-based index

        if (columnInput < 0 || columnInput >= MAX_WIDTH || !dropDisc(matrix, columnInput, activePlayer)) {
            cout << "Invalid move! Please try again.\n";
            continue;
        }

        if (isVictory(matrix, activePlayer)) {
            clearScreen();
            showGrid(matrix);
            cout << ((activePlayer == 'X') ? playerOne : playerTwo) << " wins!\n";
            break;
        }

        // Swap player tokens
        activePlayer = (activePlayer == 'X') ? 'O' : 'X';
    }

    return 0;
}
