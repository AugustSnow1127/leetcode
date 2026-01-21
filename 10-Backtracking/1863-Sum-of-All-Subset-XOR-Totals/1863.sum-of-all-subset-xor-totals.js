/*
 * @lc app=leetcode id=1863 lang=javascript
 *
 * [1863] Sum of All Subset XOR Totals
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function(nums) {
    let sum = 0;

    const dfs = function(set, idx) {
        const num = nums[idx];

        if (idx === nums.length) {
            sum += set.reduce((acc, s) => acc ^ s, 0);
        } else {
            // 選
            set.push(num);
            dfs(set, idx + 1);

            // 不選
            set.pop();
            dfs(set, idx + 1);
        }
    }

    dfs([], 0);

    return sum;
};
// @lc code=end

// 優化，嘗試不要用reduce，而是在dfs的時候就順便算XOR的和
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function(nums) {
    let res = 0;

    const dfs = function(idx, sum) {
        if (idx === nums.length) {    
            res += sum;
            return;
        }
        // 選
        sum = sum ^ nums[idx];
        dfs(idx + 1, sum);
        
        // 不選
        sum = sum ^ nums[idx]; // 兩次XOR會變回原狀
        dfs(idx + 1, sum);
    }
    dfs(0,0);

    return res;
};
// @lc code=end

/**
 * 要先找出所有subset (backtracking)
 * 
 * 找的時候直接副作用，取XOR
 * 
 * 還是對backtracking寫法很不熟
 * 對XOR也不是很熟
 * [AI引導怎麼寫出backtracking]
 * 
 * [嘗試優化]
 * 不要用reduce，而是在dfs的時候就順便算XOR的和
 */