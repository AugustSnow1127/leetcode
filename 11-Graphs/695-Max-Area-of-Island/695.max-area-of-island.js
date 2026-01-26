/*
 * @lc app=leetcode id=695 lang=javascript
 *
 * [695] Max Area of Island
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let max = 0;

    const dfs = function(x, y) {
        if (x < 0 || y < 0 ||
            x >= grid[0].length || y >= grid.length ||
            grid[y][x] === 0
        ) return 0;

        grid[y][x] = 0;
        return 1 + dfs(x - 1, y) +
        dfs(x + 1, y) +
        dfs(x, y - 1) +
        dfs(x, y + 1);
    };

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 0) continue;
            
            const count = dfs(x, y);
            max = Math.max(max, count);
        }
    }

    return max;
};
// @lc code=end

/**
 * 感覺和解numbers of island類似
 * 兩個迴圈遍歷grid，找到1就dfs向上下左右找island
 * 找到1的話就變成0，並把islandCount++
 */