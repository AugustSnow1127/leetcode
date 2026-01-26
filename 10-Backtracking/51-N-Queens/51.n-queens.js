/*
 * @lc app=leetcode id=51 lang=javascript
 *
 * [51] N-Queens
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const grid = Array.from({length: n}, () => Array(n).fill('.'));
    const res = [];
    const colSet = new Set();
    const posDiagSet = new Set();
    const negDiagSet = new Set();

    // 參考AI的psuedo code
    const dfs = function(row, currentBoard) {
        if (row === n) {
            res.push(grid.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            // 檢查col, 左斜線右斜線是不是放過了
            if (colSet.has(col) || 
                posDiagSet.has(row + col) || 
                negDiagSet.has(row - col)
            ) continue;

            // 放置
            colSet.add(col);
            posDiagSet.add(row + col);
            negDiagSet.add(row - col);
            currentBoard[row][col] = 'Q';

            // 前進下一行
            dfs(row + 1, currentBoard);

            // 反悔
            colSet.delete(col);
            posDiagSet.delete(row + col);
            negDiagSet.delete(row - col);
            currentBoard[row][col] = '.';
        }
    };

    dfs(0, grid);
    return res;
};
// @lc code=end

/**
 * 用backtracking解
 * 
 * 這題應該跟word search類似
 * 1. 建立都是.的n*n二維陣列
 * 2. 放了一個queen之後，把走過的queen的值改成Q
 * 3. 下一步用dfs檢查8個"騎士走法"的方位
 * 4. 直到放置合法的n個queen
 * 5. 放queen之後反悔，移動到下一格繼續放
 * 
 * 應該只要遍歷1層n就可以了
 * 不用遍歷整個n*n的棋盤
 * 因為每一排都至少會有一個Q
 * 
 * qCoordinates也許可以只記錄放置好的q座標陣列
 * 檢查attack的時候檢查
 * 1. x座標是否一樣
 * 2. y座標是否一樣
 * 3. abs(x-y)是否相同 (斜對角)
 * 最後再用grid迴圈填上Q
 * 
 * qGrid可以一開始用'null'填滿
 * 放置Q的時候直接改成'Q'，Q attack的位置改成'.'
 * 接下來dfs走的時候走到.或Q就代表不能走
 * 
 * 好像想錯了，不需要日字走法，只要遍歷，並選可以走的地方即可
 * 
 * [重新思考]
 * [AI 引導] queen path可以用set紀錄不能走的col, row, 右斜, 左斜
 * 
 * 檢討:
 * 1. 其實自己有想到檢查queen path的方法是要檢查用過的row, col, row + col, row - 1，但沒想到要用set檢查很可惜
 * 2. 一開始想到用日字形走法，後面發現是錯的腦筋就有點轉不過來
 * 3. 對Array.fill的語法不熟悉，沒注意到建立空的二維陣列應該也要注意深拷貝
 * 4. 自己已經大致掌握backtracking的用法，這題應該可以解出來才對。大概是因為2的關係腦袋很難重新思考
 */