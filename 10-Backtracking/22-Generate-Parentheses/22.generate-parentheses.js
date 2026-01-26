/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];

    const dfs = function(l, r, str) {
        if (l === n) {
            // 填完剩下的')'
            const end = l - r;
            for (let i = 0; i < end; i++) {
                str += ')';
            }
            res.push(str);
            return;
        }
        
        // 填'('
        dfs(l + 1, r, str + '(');
        
        // 填')'
        // 確保'('的數量 >= ')'的數量
        if (l > r) {
            dfs(l, r + 1, str + ')');
        }
    };

    dfs(0, 0, '');
    return res;
};
// @lc code=end

/**
 * parentheses有先'('再')'的限制
 * 
 * 有兩個數字l和r，計算現有的'(', ')'各有幾個，確保left > right
 * 
 * 跳過重複
 * l === r的時候，必須要直接加上'('
 * 
 * l === n || r === n的時候，就直接把剩下的填進去
 * 
 * 否則，選擇要填left or right
 * 
 * [正確]
 * 如果用string看起來就是單純的DFS
 * 不過如果用array來存，看起來就是backtracking
 */