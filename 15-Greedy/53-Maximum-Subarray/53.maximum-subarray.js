/*
 * @lc app=leetcode id=53 lang=javascript
 *
 * [53] Maximum Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // 邊界處理
    if (nums.length === 1) return nums[0];

    // 1. 用for迴圈遍歷
    // 2. 需要紀錄正數到下一個正數的和，取最大值
    let maxSum = nums[0];
    let tempSum = 0; // 到下一個正數之前，負數之和存在tempSum

    for (let i of nums) {
        tempSum += i;

        // 比較三個值
        // 1. 上一個正數到下一個正數之和(tempSum)
        // 2. 目前最大的和(maxSum)
        // 3. 當前的數字i (因為有可能i超大，導致前面的負數拖累最大值)
        maxSum = Math.max(tempSum, maxSum, i);
        tempSum = Math.max(tempSum, i);
    }

    return maxSum;
};
// @lc code=end

/**
 * 思考
 * 要從陣列中找出子陣列，他的和是最大的
 * 1. 陣列是連續的
 * [問AI Greedy演算法是什麼?] 簡單來說，Greedy 的核心精神就是：「活在當下，做出當前看起來最好的選擇」。
 * 2. 由於陣列是連續的，所以subarray的最左右兩側必定是"正數"，因為沒必要挑負數進來降低sum的大小
 * 換句話說，要關注的重點是:「正數到下一個正數」的區間總和是否為最大
 * 3. 應該可以用O(n)從頭遍歷，邊走邊找出正數區間的和
 * [假設錯誤] 有可能都是負數
 * 4. tempSum重算的時機點是什麼?
 * 5. 應該不要管是不是正負數，只要取tempSum, maxSum, i最大值就好
 */
