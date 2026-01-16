/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const grid = [new Array(n).fill(1)]; // 第一行都是1

    for (let i = 1; i < m; i++) {
        grid[i] = [];
        grid[i][0] = 1;
        for (let j = 1; j < n; j++) {
            grid[i][j] = grid[i][j - 1] + grid[i - 1][j];
        }
    }

    return grid[m - 1][n - 1];
};

// 更省空間的寫法
var uniquePaths = function(m, n) {
    let row = Array(n).fill(1); // 只需要一個陣列
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // row[j] 原本存的是「上面那一格」的值 (舊的 row[j])
            // row[j-1] 已經被更新過，存的是「左邊那一格」的值
            // 所以新的 row[j] = 左邊 + 上面
            row[j] = row[j] + row[j-1];
        }
    }
    return row[n-1];
};
// @lc code=end

/**
 * 這一題高中數學有教，是"回首來時路"的題型
 * 以3X2的格子為例，用累加的方式算出抵達終點的可能性，即
 * 
 * 0 0 0  ->  1 1 1  ->  所以共有3種走法    
 * 0 0 0      1 2 3
 * 
 * 換句話說這就是2-D DP要考的
 * 在2D平面上做DP
 * 
 * 需要O(n^2)，用兩個for算出到終點的可能性數量
 */