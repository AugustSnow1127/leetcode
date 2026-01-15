/*
 * @lc app=leetcode id=200 lang=javascript
 *
 * [200] Number of Islands
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    // 因為要遞迴，所以需要一個函數來向上下左右檢查
    let islands = 0;

    const check = function(i, j) {
        // 如果遇到邊界就不檢查
        if (i === -1 || j === -1 || i === grid.length || j === grid[0].length) return;

        // 如果遇到0就不繼續檢查
        if (grid[i][j] === '0') return;

        // 檢查當前座標是不是1，如果是則變成0
        if (grid[i][j] === '1') {
            grid[i][j] = '0';

            // 繼續向上下左右檢查
            check(i - 1, j); // 上
            check(i + 1, j); // 下
            check(i, j - 1); // 左
            check(i, j + 1); // 右
        }
    }

    // 用兩個迴圈遍歷整個grid，找到第一個1之後用check消除整座島
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                islands++;
                check(i, j);
            }
        }
    }

    return islands;
};
// @lc code=end

/**
 * 思考
 * 1. 題目要我算數字島的數量
 * 2. 先思考島的"定義"
 * 3. 思考島的邊界 -> 對角線?
 * 4. 把圖畫出來後，發現應該檢查的是1的上下左右是否為0，只要都是0則為一個島
 *  對Y軸，檢查相同i的是否為0
 *  對X軸，從第一個1開始檢查，檢查到最後一個是0的位置
 * 5. [看AI給的readme]
 *  檢查上下左右是0的做法對了，但少思考到兩個東西
 *  1. 用遞迴(DFS)的方式往上下左右去探索
 *  2. 探索過的地方直接改成0，代表標記過
 *  換句話說，要用兩個迴圈O(n^2)來遍歷，遇到1就向上下左右DFS去找1
 *  只要有找到1就換成0，並+1島嶼數量
 */