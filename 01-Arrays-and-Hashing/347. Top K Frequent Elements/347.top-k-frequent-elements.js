/*
 * @lc app=leetcode id=347 lang=javascript
 *
 * [347] Top K Frequent Elements
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const map = {};

    for (let n of nums) {
        if (!map[n]) map[n] = 0;
        map[n] = map[n] + 1;
    }

    // 由大到小排序 (b - a)
    const arr = Object.entries(map).sort((a, b) => b[1] - a[1]);
    
    const res = [];
    for (let i = 0; i < k; i++) {
        // 只把 key (也就是數字本身) 推入，並轉為 Number
        res.push(Number(arr[i][0]));
    }

    return res;
};
// @lc code=end

/**
 * 要統計每個數字的頻率
 * 
 * Q: 如何排序找出最大頻率的k個?
 * 需要一個length = k的陣列，每次比較maxLength的時候，就把該數字push進去
 * 如果該陣列滿了，則踢掉最小的值
 */