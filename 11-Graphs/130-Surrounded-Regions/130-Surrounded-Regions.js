/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    const oSet = new Set();
    const m = board.length;
    const n = board[0].length;

    const checkNotSurrounded = function(x, y) {
        if (x < 0 || y < 0 || x >= n || y >= m ||
            board[y][x] === 'X' || oSet.has(`${y},${x}`)
        ) return;

        oSet.add(`${y},${x}`);

        checkNotSurrounded(x - 1, y);
        checkNotSurrounded(x + 1, y);
        checkNotSurrounded(x, y - 1);
        checkNotSurrounded(x, y + 1);

        return;
    };

    // 從邊緣檢查，標記和邊界相連的O island
    for (let y = 0; y < m; y++) {
        if (board[y][0] === 'O') checkNotSurrounded(0, y);
        if (board[y][n - 1] === 'O') checkNotSurrounded(n - 1, y);
    }
    for (let x = 0; x < n; x++) {
        if (board[0][x] === 'O') checkNotSurrounded(x, 0);
        if (board[m - 1][x] === 'O') checkNotSurrounded(x, m - 1);
    }

    // 遍歷整張board，把沒有被標記過的O island都替換成X
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            if (board[y][x] === 'O' && !oSet.has(`${y},${x}`)) board[y][x] = 'X';
        }
    }

    return board;
};

/**
 * 要先定義怎樣才算surrounded
 * 看起來只有一種可能不算surrounded，那就是'O'碰到邊界
 * 
 * Q: 要怎麼在確認surrounded後，把O改成X?
 * 1. 可以像上一題一樣，先從邊界把O的island加入set，最後再用二維遍歷+DFS的方式把不在set裡的O改成X
 * 
 */