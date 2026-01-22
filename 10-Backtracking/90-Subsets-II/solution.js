/*
 * @lc app=leetcode id=90 lang=javascript
 *
 * [90] Subsets II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
    // 1. 排序是去重的前提
    nums.sort((a, b) => a - b);

    const res = [];
    const subset = [];

    // start: 我們只能從這個位置之後挑數字 (因為不能回頭)
    const backtrack = function (start) {
        // 每進入一次遞迴，代表我們形成了一個新的合法子集 (不管是長還是短)
        // 所以直接加入答案 (注意要深拷貝)
        res.push([...subset]);

        // "填空" 思維：
        // 這一格，我可以填入從 start 開始到最後的任意一個數字
        for (let i = start; i < nums.length; i++) {

            // 去重核心：
            // 如果這不是我們這層迴圈的第一個選擇 (i > start)
            // 而且這個數字跟前一個選擇一樣 (nums[i] === nums[i-1])
            // 那就跳過，因為前一個迴圈已經處理過這個數字開頭的情況了
            if (i > start && nums[i] === nums[i - 1]) continue;

            // 1. 做決定：選 nums[i]
            subset.push(nums[i]);

            // 2. 遞迴：下一格只能從 i + 1 開始選
            backtrack(i + 1);

            // 3. 反悔 (Backtrack)：把 nums[i] 拿出來，準備給迴圈選下一個數字
            subset.pop();
        }
    }

    backtrack(0);
    return res;
};
// @lc code=end
