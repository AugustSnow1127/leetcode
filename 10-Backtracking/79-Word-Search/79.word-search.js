/*
 * @lc app=leetcode id=79 lang=javascript
 *
 * [79] Word Search
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const dfs = function(x, y, i) {
        // resWord找完後回傳true
        if (i === word.length) {
            return true;
        }
        // 移動到邊界就停止
        if (x < 0
            || x >= board[0].length
            || y < 0
            || y >= board.length
        ) return false;

        // 如果當前的字符合
        if (board[y][x] === word[i]) {
            // [想錯了? 我好像沒辦法靠把走過的路改成-1]
            const temp = board[y][x];
            board[y][x] = -1;
            // 繼續朝上下左右前進
            const res =  dfs(x - 1, y, i + 1) ||
                dfs(x + 1, y, i + 1) ||
                dfs(x, y - 1, i + 1) ||
                dfs(x, y + 1, i + 1);

            // 反悔"把路過的改成-1"
            board[y][x] = temp;
            
            return res;
        }
        // 不符合就停止
        return false;
    }

    for(let y = 0; y < board.length; y++) {
        for(let x = 0; x < board[0].length; x++) {
            if (dfs(x, y, 0)) return true;
            
        }
    }

    return false;
};
// @lc code=end

/**
 * 根據前面解backtracking的經驗
 * 大概開始可以看出這題的backtracking形式
 * 就是選到一半不選的感覺
 * 
 * 問題在於，如何遍歷
 * 
 * 從上一次做graph的經驗，可以知道要從走到的格子進行"上下左右"的dfs
 * 
 * 1. 用迴圈找到word[0]
 * 2. 用dfs上下左右尋找剩餘的word
 * 
 * [好像想錯了?] 這題跟之前那題不一樣，不能直接把走過的路標成-1
 * 不然其他共用同一格字的會失敗
 * 
 * [又好像沒想錯] 只要把改成-1這件事"反悔"就可以
 */