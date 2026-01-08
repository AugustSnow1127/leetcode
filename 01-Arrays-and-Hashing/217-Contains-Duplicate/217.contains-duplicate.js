/*
 * @lc app=leetcode id=217 lang=javascript
 *
 * [217] Contains Duplicate
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const set = new Set();
    let i = 0;

    while (i < nums.length) {
        if (set.has(nums[i])) return true;
        
        set.add(nums[i]);
        i++;
    } 
    return false;
};
// @lc code=end

/**
 * 思考
 * 
 * 1. 只需知道有無重複即可，用set可以O(1)解決
 * 
 */